import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Pet } from '../types/Pet';
import { GameTimeManager, PetStateManager } from '../store/GameState';
import PixelPet from './PixelPet';
import PixelButton from './PixelButton';

/**
 * 主游戏组件
 */
const PetGame: React.FC = () => {
  const [pet, setPet] = useState<Pet | null>(null);
  const [isNight, setIsNight] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  const gameTimeManager = GameTimeManager.getInstance();
  const petStateManager = PetStateManager.getInstance();

  useEffect(() => {
    // 创建新宠物
    const newPet = petStateManager.createPet('小萌', 'cat');
    setPet(newPet);

    // 设置游戏循环
    const gameLoop = setInterval(() => {
      gameTimeManager.updateTime();
      const newIsNight = gameTimeManager.getIsNight();
      
      if (newIsNight !== isNight) {
        // 日夜切换动画
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start();
        setIsNight(newIsNight);
      }
      
      if (pet) {
        petStateManager.updatePetStats(pet.id);
        setPet({ ...petStateManager.getPet(pet.id)! });
      }
    }, 1000);

    return () => clearInterval(gameLoop);
  }, []);

  const handleFeed = () => {
    if (pet) {
      petStateManager.feedPet(pet.id);
      setPet({ ...petStateManager.getPet(pet.id)! });
    }
  };

  const handleDrink = () => {
    if (pet) {
      petStateManager.giveDrink(pet.id);
      setPet({ ...petStateManager.getPet(pet.id)! });
    }
  };

  const handleClean = () => {
    if (pet) {
      petStateManager.clean(pet.id);
      setPet({ ...petStateManager.getPet(pet.id)! });
    }
  };

  const handlePlay = () => {
    if (pet) {
      petStateManager.play(pet.id);
      setPet({ ...petStateManager.getPet(pet.id)! });
    }
  };

  if (!pet) return null;

  return (
    <Animated.View 
      style={[
        styles.container,
        isNight && styles.nightContainer,
        { opacity: fadeAnim }
      ]}
    >
      <Text style={[styles.title, isNight && styles.nightText]}>
        {pet.name}的小窝
      </Text>
      
      <View style={styles.statsContainer}>
        <Text style={[styles.stat, isNight && styles.nightText]}>
          能量: {Math.round(pet.stats.energy)}%
        </Text>
        <Text style={[styles.stat, isNight && styles.nightText]}>
          水分: {Math.round(pet.stats.hydration)}%
        </Text>
        <Text style={[styles.stat, isNight && styles.nightText]}>
          清洁: {Math.round(pet.stats.cleanliness)}%
        </Text>
        <Text style={[styles.stat, isNight && styles.nightText]}>
          心情: {Math.round(pet.stats.happiness)}%
        </Text>
      </View>

      <View style={styles.petContainer}>
        <PixelPet
          mood={pet.mood}
          isNight={isNight}
          type={pet.type}
        />
      </View>

      <View style={styles.actionContainer}>
        <PixelButton
          title="喂食"
          onPress={handleFeed}
          containerStyle={styles.actionButton}
        />
        <PixelButton
          title="喂水"
          onPress={handleDrink}
          containerStyle={styles.actionButton}
        />
        <PixelButton
          title="清洁"
          onPress={handleClean}
          containerStyle={styles.actionButton}
        />
        <PixelButton
          title="玩耍"
          onPress={handlePlay}
          containerStyle={styles.actionButton}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  nightContainer: {
    backgroundColor: '#2c3e50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  nightText: {
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 10,
  },
  stat: {
    fontSize: 16,
    color: '#333',
  },
  petContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    flexWrap: 'wrap',
  },
  actionButton: {
    margin: 5,
    minWidth: 80,
  },
});

export default PetGame; 