/**
 * 天气类型枚举
 */
export enum WeatherType {
  SUNNY = 'SUNNY',
  CLOUDY = 'CLOUDY',
  RAINY = 'RAINY',
  SNOWY = 'SNOWY',
  WINDY = 'WINDY',
  STORMY = 'STORMY',
}

/**
 * 天气数据接口
 */
export interface WeatherData {
  type: WeatherType;
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

/**
 * 天气效果接口
 */
export interface WeatherEffect {
  petMoodModifier: number;
  energyConsumptionRate: number;
  exerciseEfficiency: number;
  specialEvents?: string[];
}

/**
 * 时间周期枚举
 */
export enum DayPeriod {
  DAWN = 'DAWN',
  MORNING = 'MORNING',
  NOON = 'NOON',
  AFTERNOON = 'AFTERNOON',
  EVENING = 'EVENING',
  NIGHT = 'NIGHT',
} 