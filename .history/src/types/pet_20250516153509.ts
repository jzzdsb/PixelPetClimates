/**
 * 宠物状态枚举
 */
export enum PetMood {
  HAPPY = 'HAPPY',
  NORMAL = 'NORMAL',
  SAD = 'SAD',
  ANGRY = 'ANGRY',
  SICK = 'SICK',
}

/**
 * 宠物形态枚举
 */
export enum PetForm {
  BASIC = 'BASIC',
  SUNNY_SPRITE = 'SUNNY_SPRITE',
  SNOW_MONSTER = 'SNOW_MONSTER',
  JELLY = 'JELLY',
  RAIN_SPIRIT = 'RAIN_SPIRIT',
}

/**
 * 食物类型枚举
 */
export enum FoodType {
  BREAD = 'BREAD',
  FRUIT = 'FRUIT',
  WATER = 'WATER',
  CANDY = 'CANDY',
}

/**
 * 宠物状态接口
 */
export interface PetStats {
  energy: number;
  health: number;
  happiness: number;
  cleanliness: number;
  weight: number;
  exerciseLevel: number;
}

/**
 * 宠物数据接口
 */
export interface Pet {
  id: string;
  name: string;
  form: PetForm;
  mood: PetMood;
  stats: PetStats;
  lastFed: Date;
  lastCleaned: Date;
  lastExercise: Date;
  evolutionProgress: {
    [key in PetForm]: number;
  };
} 