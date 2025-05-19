import axios from 'axios';
import { WeatherData, WeatherType, WeatherEffect } from '../types/weather';

/**
 * 天气服务类 - 处理天气API集成和效果计算
 */
export class WeatherService {
  private static readonly API_KEY = 'YOUR_OPENWEATHER_API_KEY';
  private static readonly API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

  /**
   * 获取当前位置的天气数据
   * @param latitude - 纬度
   * @param longitude - 经度
   */
  static async getCurrentWeather(latitude: number, longitude: number): Promise<WeatherData> {
    try {
      const response = await axios.get(
        `${this.API_BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${this.API_KEY}&units=metric`
      );

      return this.mapApiResponseToWeatherData(response.data);
    } catch (error) {
      console.error('获取天气数据失败:', error);
      throw error;
    }
  }

  /**
   * 计算天气效果
   * @param weather - 天气数据
   */
  static calculateWeatherEffect(weather: WeatherData): WeatherEffect {
    const effect: WeatherEffect = {
      petMoodModifier: 0,
      energyConsumptionRate: 1,
      exerciseEfficiency: 1,
      specialEvents: [],
    };

    switch (weather.type) {
      case WeatherType.SUNNY:
        effect.petMoodModifier = 2;
        effect.exerciseEfficiency = 1.2;
        effect.energyConsumptionRate = 1.1;
        break;
      case WeatherType.RAINY:
        effect.petMoodModifier = -1;
        effect.exerciseEfficiency = 0.8;
        effect.energyConsumptionRate = 0.9;
        effect.specialEvents = ['雨滴收集'];
        break;
      case WeatherType.SNOWY:
        effect.petMoodModifier = 1;
        effect.exerciseEfficiency = 0.7;
        effect.energyConsumptionRate = 1.2;
        effect.specialEvents = ['堆雪人'];
        break;
      case WeatherType.WINDY:
        effect.petMoodModifier = 0;
        effect.exerciseEfficiency = 0.9;
        effect.energyConsumptionRate = 1.1;
        break;
      case WeatherType.STORMY:
        effect.petMoodModifier = -2;
        effect.exerciseEfficiency = 0.5;
        effect.energyConsumptionRate = 1.3;
        break;
    }

    return effect;
  }

  private static mapApiResponseToWeatherData(apiResponse: any): WeatherData {
    const weatherType = this.mapWeatherCodeToType(apiResponse.weather[0].id);
    
    return {
      type: weatherType,
      temperature: apiResponse.main.temp,
      humidity: apiResponse.main.humidity,
      windSpeed: apiResponse.wind.speed,
      description: apiResponse.weather[0].description,
      icon: apiResponse.weather[0].icon,
    };
  }

  private static mapWeatherCodeToType(weatherCode: number): WeatherType {
    // OpenWeather API 天气代码映射
    if (weatherCode >= 200 && weatherCode < 300) return WeatherType.STORMY;
    if (weatherCode >= 300 && weatherCode < 600) return WeatherType.RAINY;
    if (weatherCode >= 600 && weatherCode < 700) return WeatherType.SNOWY;
    if (weatherCode >= 700 && weatherCode < 800) return WeatherType.CLOUDY;
    if (weatherCode === 800) return WeatherType.SUNNY;
    if (weatherCode > 800) return WeatherType.CLOUDY;
    return WeatherType.SUNNY;
  }
} 