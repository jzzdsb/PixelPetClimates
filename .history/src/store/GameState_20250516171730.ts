import { Pet, PetMood, PetStats } from '../types/Pet';

/**
 * 游戏时间管理器
 */
export class GameTimeManager {
  private static instance: GameTimeManager;
  private currentTime: Date;
  private isNight: boolean;

  private constructor() {
    this.currentTime = new Date();
    this.isNight = this.checkIsNight();
  }

  /**
   * 获取游戏时间管理器实例
   */
  public static getInstance(): GameTimeManager {
    if (!GameTimeManager.instance) {
      GameTimeManager.instance = new GameTimeManager();
    }
    return GameTimeManager.instance;
  }

  /**
   * 检查当前是否是夜晚
   */
  private checkIsNight(): boolean {
    const hours = this.currentTime.getHours();
    return hours >= 20 || hours < 6;
  }

  /**
   * 更新游戏时间
   */
  public updateTime(): void {
    this.currentTime = new Date();
    this.isNight = this.checkIsNight();
  }

  /**
   * 获取当前是否是夜晚
   */
  public getIsNight(): boolean {
    return this.isNight;
  }
}

/**
 * 宠物状态管理器
 */
export class PetStateManager {
  private static instance: PetStateManager;
  private pets: Map<string, Pet>;

  private constructor() {
    this.pets = new Map();
  }

  /**
   * 获取宠物状态管理器实例
   */
  public static getInstance(): PetStateManager {
    if (!PetStateManager.instance) {
      PetStateManager.instance = new PetStateManager();
    }
    return PetStateManager.instance;
  }

  /**
   * 创建新宠物
   */
  public createPet(name: string, type: string): Pet {
    const newPet: Pet = {
      id: Date.now().toString(),
      name,
      type,
      mood: PetMood.HAPPY,
      stats: {
        energy: 100,
        hydration: 100,
        cleanliness: 100,
        happiness: 100,
        health: 100,
      },
      lastFed: new Date(),
      lastDrank: new Date(),
      lastCleaned: new Date(),
      lastPlayed: new Date(),
      createdAt: new Date(),
    };
    this.pets.set(newPet.id, newPet);
    return newPet;
  }

  /**
   * 获取宠物信息
   */
  public getPet(petId: string): Pet | undefined {
    return this.pets.get(petId);
  }

  /**
   * 更新宠物状态
   */
  public updatePetStats(petId: string): void {
    const pet = this.pets.get(petId);
    if (!pet) return;

    const now = new Date();
    const timeSinceLastFed = (now.getTime() - pet.lastFed.getTime()) / (1000 * 60); // 转换为分钟
    const timeSinceLastDrank = (now.getTime() - pet.lastDrank.getTime()) / (1000 * 60);
    const timeSinceLastCleaned = (now.getTime() - pet.lastCleaned.getTime()) / (1000 * 60);
    const timeSinceLastPlayed = (now.getTime() - pet.lastPlayed.getTime()) / (1000 * 60);

    // 更新状态值
    pet.stats.energy = Math.max(0, pet.stats.energy - timeSinceLastFed * 0.1);
    pet.stats.hydration = Math.max(0, pet.stats.hydration - timeSinceLastDrank * 0.15);
    pet.stats.cleanliness = Math.max(0, pet.stats.cleanliness - timeSinceLastCleaned * 0.05);
    pet.stats.happiness = Math.max(0, pet.stats.happiness - timeSinceLastPlayed * 0.08);

    // 更新心情
    this.updatePetMood(pet);
  }

  /**
   * 更新宠物心情
   */
  private updatePetMood(pet: Pet): void {
    const averageStats = (
      pet.stats.energy +
      pet.stats.hydration +
      pet.stats.cleanliness +
      pet.stats.happiness
    ) / 4;

    if (averageStats >= 75) {
      pet.mood = PetMood.HAPPY;
    } else if (averageStats >= 50) {
      pet.mood = PetMood.NORMAL;
    } else if (averageStats >= 25) {
      pet.mood = PetMood.SAD;
    } else {
      pet.mood = PetMood.ANGRY;
    }
  }

  /**
   * 喂食
   */
  public feedPet(petId: string): void {
    const pet = this.pets.get(petId);
    if (!pet) return;

    pet.stats.energy = Math.min(100, pet.stats.energy + 30);
    pet.lastFed = new Date();
    this.updatePetMood(pet);
  }

  /**
   * 喂水
   */
  public giveDrink(petId: string): void {
    const pet = this.pets.get(petId);
    if (!pet) return;

    pet.stats.hydration = Math.min(100, pet.stats.hydration + 30);
    pet.lastDrank = new Date();
    this.updatePetMood(pet);
  }

  /**
   * 清洁
   */
  public clean(petId: string): void {
    const pet = this.pets.get(petId);
    if (!pet) return;

    pet.stats.cleanliness = 100;
    pet.lastCleaned = new Date();
    this.updatePetMood(pet);
  }

  /**
   * 玩耍
   */
  public play(petId: string): void {
    const pet = this.pets.get(petId);
    if (!pet) return;

    pet.stats.happiness = Math.min(100, pet.stats.happiness + 20);
    pet.stats.energy = Math.max(0, pet.stats.energy - 10);
    pet.lastPlayed = new Date();
    this.updatePetMood(pet);
  }
} 