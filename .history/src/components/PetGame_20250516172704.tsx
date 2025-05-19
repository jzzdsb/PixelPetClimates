import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Pet } from '../types/Pet';
import { GameTimeManager, PetStateManager } from '../store/GameState';

/**
 * 主游戏组件
 */
const PetGame: React.FC = () => {
  const [pet, setPet] = useState<Pet | null>(null);
  const [isNight, setIsNight] = useState(false);

  const gameTimeManager = GameTimeManager.getInstance();
  const petStateManager = PetStateManager.getInstance();

  useEffect(() => {
    // 创建新宠物
    const newPet = petStateManager.createPet('小萌', 'cat');
    setPet(newPet);

    // 设置游戏循环
    const gameLoop = setInterval(() => {
      gameTimeManager.updateTime();
      setIsNight(gameTimeManager.getIsNight());
      
      if (pet) {
        petStateManager.updatePetStats(pet.id);
        setPet({ ...petStateManager.getPet(pet.id)! });
      }
    }, 1000); // 每秒更新一次

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
    <View style={[styles.container, isNight && styles.nightContainer]}>
      <Text style={styles.title}>{pet.name}的小窝</Text>
      
      <View style={styles.statsContainer}>
        <Text style={styles.stat}>能量: {Math.round(pet.stats.energy)}%</Text>
        <Text style={styles.stat}>水分: {Math.round(pet.stats.hydration)}%</Text>
        <Text style={styles.stat}>清洁: {Math.round(pet.stats.cleanliness)}%</Text>
        <Text style={styles.stat}>心情: {Math.round(pet.stats.happiness)}%</Text>
      </View>

      <View style={styles.petContainer}>
        {/* 这里后续需要添加像素风格的宠物图片 */}
        <Text style={styles.petMood}>心情: {pet.mood}</Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.button} onPress={handleFeed}>
          <Text style={styles.buttonText}>喂食</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDrink}>
          <Text style={styles.buttonText}>喂水</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleClean}>
          <Text style={styles.buttonText}>清洁</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePlay}>
          <Text style={styles.buttonText}>玩耍</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  stat: {
    fontSize: 16,
  },
  petContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  petMood: {
    fontSize: 20,
    marginTop: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PetGame; 