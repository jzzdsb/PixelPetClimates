import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Pet, PetStats, PetMood, PetForm, FoodType } from '../types/pet';
import { WeatherData, WeatherEffect, WeatherType } from '../types/weather';
import { PetService } from '../services/PetService';
import { WeatherService } from '../services/WeatherService';
import PetDisplay from './PetDisplay';
import ControlPanel from './ControlPanel';
import * as Location from 'expo-location';

/**
 * 主游戏组件
 */
const Game: React.FC = () => {
  const [pet, setPet] = useState<Pet>({
    id: '1',
    name: '像素宠物',
    form: PetForm.BASIC,
    mood: PetMood.NORMAL,
    stats: {
      energy: 100,
      health: 100,
      happiness: 50,
      cleanliness: 100,
      weight: 100,
      exerciseLevel: 50,
    },
    lastFed: new Date(),
    lastCleaned: new Date(),
    lastExercise: new Date(),
    evolutionProgress: {
      [PetForm.BASIC]: 0,
      [PetForm.SUNNY_SPRITE]: 0,
      [PetForm.SNOW_MONSTER]: 0,
      [PetForm.JELLY]: 0,
      [PetForm.RAIN_SPIRIT]: 0,
    },
  });

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherEffect, setWeatherEffect] = useState<WeatherEffect>({
    petMoodModifier: 0,
    energyConsumptionRate: 1,
    exerciseEfficiency: 1,
  });

  useEffect(() => {
    // 获取位置和天气信息
    const fetchWeatherData = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('需要位置权限', '请允许应用获取位置信息以获取天气数据');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const weatherData = await WeatherService.getCurrentWeather(
          location.coords.latitude,
          location.coords.longitude
        );
        setWeather(weatherData);
        const effect = WeatherService.calculateWeatherEffect(weatherData);
        setWeatherEffect(effect);
      } catch (error) {
        console.error('获取天气失败:', error);
        Alert.alert('获取天气失败', '请检查网络连接');
      }
    };

    fetchWeatherData();
    const weatherInterval = setInterval(fetchWeatherData, 1800000); // 每30分钟更新一次天气

    return () => clearInterval(weatherInterval);
  }, []);

  useEffect(() => {
    // 定时更新宠物状态
    const updateInterval = setInterval(() => {
      const now = new Date();
      const lastUpdate = pet.lastFed;
      const timeDelta = now.getTime() - lastUpdate.getTime();
      
      const updatedPet = PetService.updatePetStatus(pet, weatherEffect, timeDelta);
      setPet(updatedPet);

      // 检查是否需要清理
      if (now.getTime() - pet.lastCleaned.getTime() > 7200000) { // 2小时
        Alert.alert('提醒', '宠物需要清理了！');
      }
    }, 60000); // 每分钟更新一次状态

    return () => clearInterval(updateInterval);
  }, [pet, weatherEffect]);

  const handleFeed = (foodType: FoodType) => {
    const updatedPet = PetService.feed(pet, foodType);
    setPet(updatedPet);
  };

  const handleClean = () => {
    const updatedPet = PetService.clean(pet);
    setPet(updatedPet);
  };

  const handlePlay = () => {
    // 这里可以添加小游戏逻辑
    const exerciseAmount = 20; // 假设每次运动增加20点运动值
    const updatedPet = PetService.exercise(pet, exerciseAmount);
    setPet(updatedPet);
  };

  const handleCare = () => {
    setPet({
      ...pet,
      stats: {
        ...pet.stats,
        happiness: Math.min(100, pet.stats.happiness + 5),
      },
    });
  };

  return (
    <View style={styles.container}>
      <PetDisplay
        pet={pet}
        weather={weather?.type || WeatherType.SUNNY}
      />
      <ControlPanel
        pet={pet}
        weather={weather?.type || WeatherType.SUNNY}
        onFeed={handleFeed}
        onClean={handleClean}
        onPlay={handlePlay}
        onCare={handleCare}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Game; 