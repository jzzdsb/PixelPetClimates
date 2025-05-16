import React from 'react';
import { View, StyleSheet, Image, Text, Animated } from 'react-native';
import { Pet, PetMood, PetForm } from '../types/pet';
import { WeatherType } from '../types/weather';

interface PetDisplayProps {
  pet: Pet;
  weather: WeatherType;
}

/**
 * 宠物显示组件 - 负责渲染宠物动画和状态
 */
const PetDisplay: React.FC<PetDisplayProps> = ({ pet, weather }) => {
  // 动画值
  const bounceAnim = React.useRef(new Animated.Value(0)).current;
  const weatherAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // 宠物弹跳动画
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 天气效果动画
    Animated.loop(
      Animated.sequence([
        Animated.timing(weatherAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(weatherAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const getPetImage = () => {
    // 这里需要根据宠物形态和心情返回对应的图片资源
    switch (pet.form) {
      case PetForm.BASIC:
        return require('../assets/pets/basic.png');
      case PetForm.SUNNY_SPRITE:
        return require('../assets/pets/sunny.png');
      case PetForm.SNOW_MONSTER:
        return require('../assets/pets/snow.png');
      case PetForm.JELLY:
        return require('../assets/pets/jelly.png');
      case PetForm.RAIN_SPIRIT:
        return require('../assets/pets/rain.png');
      default:
        return require('../assets/pets/basic.png');
    }
  };

  const getMoodEmoji = () => {
    switch (pet.mood) {
      case PetMood.HAPPY:
        return '😊';
      case PetMood.SAD:
        return '😢';
      case PetMood.ANGRY:
        return '😠';
      case PetMood.SICK:
        return '🤒';
      default:
        return '😐';
    }
  };

  const translateY = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <View style={styles.container}>
      <View style={styles.weatherEffect}>
        <Animated.View
          style={[
            styles.weatherParticle,
            {
              opacity: weatherAnim,
              transform: [
                {
                  translateY: weatherAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 100],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
      
      <Animated.View
        style={[
          styles.petContainer,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <Image source={getPetImage()} style={styles.petImage} />
        <Text style={styles.moodEmoji}>{getMoodEmoji()}</Text>
      </Animated.View>

      <View style={styles.statsContainer}>
        <Text style={styles.petName}>{pet.name}</Text>
        <View style={styles.statBar}>
          <View style={[styles.statFill, { width: `${pet.stats.energy}%` }]} />
          <Text style={styles.statText}>能量: {pet.stats.energy}%</Text>
        </View>
        <View style={styles.statBar}>
          <View style={[styles.statFill, { width: `${pet.stats.happiness}%` }]} />
          <Text style={styles.statText}>心情: {pet.stats.happiness}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherEffect: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
  },
  weatherParticle: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  petContainer: {
    alignItems: 'center',
  },
  petImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  moodEmoji: {
    fontSize: 24,
    marginTop: 8,
  },
  statsContainer: {
    marginTop: 20,
    width: '80%',
  },
  petName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  statBar: {
    height: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginVertical: 5,
    overflow: 'hidden',
  },
  statFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#4CAF50',
  },
  statText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    lineHeight: 20,
    color: '#000',
  },
});

export default PetDisplay; 