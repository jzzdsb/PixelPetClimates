import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Pet, PetStats, PetMood, PetForm } from '../types/pet';
import { WeatherData, WeatherEffect } from '../types/weather';
import { PetService } from '../services/PetService';
import { WeatherService } from '../services/WeatherService';

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
    const fetchWeather = async () => {
      try {
        // 这里需要实现获取地理位置的逻辑
        const latitude = 0;
        const longitude = 0;
        const weatherData = await WeatherService.getCurrentWeather(latitude, longitude);
        setWeather(weatherData);
        const effect = WeatherService.calculateWeatherEffect(weatherData);
        setWeatherEffect(effect);
      } catch (error) {
        console.error('获取天气失败:', error);
      }
    };

    fetchWeather();
    const weatherInterval = setInterval(fetchWeather, 1800000); // 每30分钟更新一次天气

    return () => clearInterval(weatherInterval);
  }, []);

  useEffect(() => {
    // 定时更新宠物状态
    const updateInterval = setInterval(() => {
      const now = new Date();
      const lastUpdate = pet.lastFed; // 使用最后喂食时间作为上次更新时间
      const timeDelta = now.getTime() - lastUpdate.getTime();
      
      const updatedPet = PetService.updatePetStatus(pet, weatherEffect, timeDelta);
      setPet(updatedPet);
    }, 60000); // 每分钟更新一次状态

    return () => clearInterval(updateInterval);
  }, [pet, weatherEffect]);

  return (
    <View style={styles.container}>
      {/* 这里将添加游戏UI组件 */}
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