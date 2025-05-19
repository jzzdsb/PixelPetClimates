/**
 * 宠物状态枚举
 */
export enum PetMood {
  HAPPY = 'HAPPY',
  NORMAL = 'NORMAL',
  SAD = 'SAD',
  ANGRY = 'ANGRY',
}

/**
 * 宠物属性接口
 */
export interface PetStats {
  energy: number;      // 能量值 0-100
  hydration: number;   // 水分值 0-100
  cleanliness: number; // 清洁度 0-100
  happiness: number;   // 幸福度 0-100
  health: number;      // 健康度 0-100
}

/**
 * 宠物类型接口
 */
export interface Pet {
  id: string;
  name: string;
  type: string;
  mood: PetMood;
  stats: PetStats;
  lastFed: Date;
  lastDrank: Date;
  lastCleaned: Date;
  lastPlayed: Date;
  createdAt: Date;
} 