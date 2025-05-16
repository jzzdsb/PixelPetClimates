import { Pet, PetStats, PetMood, PetForm, FoodType } from '../types/pet';
import { WeatherType, WeatherEffect } from '../types/weather';

/**
 * 宠物服务类 - 处理宠物状态更新和进化
 */
export class PetService {
  /**
   * 更新宠物状态
   * @param pet - 当前宠物状态
   * @param weatherEffect - 天气效果
   * @param timeDelta - 时间间隔（毫秒）
   */
  static updatePetStatus(
    pet: Pet,
    weatherEffect: WeatherEffect,
    timeDelta: number
  ): Pet {
    const hoursPassed = timeDelta / (1000 * 60 * 60);
    
    // 更新基础状态
    const newStats: PetStats = {
      ...pet.stats,
      energy: Math.max(0, Math.min(100, pet.stats.energy - (2 * hoursPassed * weatherEffect.energyConsumptionRate))),
      cleanliness: Math.max(0, Math.min(100, pet.stats.cleanliness - (5 * hoursPassed))),
      happiness: Math.max(0, Math.min(100, pet.stats.happiness + (weatherEffect.petMoodModifier * hoursPassed))),
    };

    // 更新心情
    let newMood = PetMood.NORMAL;
    if (newStats.energy < 20 || newStats.cleanliness < 30) {
      newMood = PetMood.SAD;
    } else if (newStats.happiness > 80) {
      newMood = PetMood.HAPPY;
    }

    return {
      ...pet,
      stats: newStats,
      mood: newMood,
    };
  }

  /**
   * 喂食
   * @param pet - 当前宠物状态
   * @param foodType - 食物类型
   */
  static feed(pet: Pet, foodType: FoodType): Pet {
    const energyGain = this.getFoodEnergy(foodType);
    const newStats = { ...pet.stats };
    newStats.energy = Math.min(100, newStats.energy + energyGain);
    
    // 更新进化进度
    const evolutionProgress = { ...pet.evolutionProgress };
    switch (foodType) {
      case FoodType.FRUIT:
        evolutionProgress[PetForm.JELLY] += 1;
        break;
      case FoodType.WATER:
        evolutionProgress[PetForm.RAIN_SPIRIT] += 0.5;
        break;
    }

    return {
      ...pet,
      stats: newStats,
      evolutionProgress,
      lastFed: new Date(),
    };
  }

  /**
   * 清理
   * @param pet - 当前宠物状态
   */
  static clean(pet: Pet): Pet {
    return {
      ...pet,
      stats: {
        ...pet.stats,
        cleanliness: 100,
        happiness: Math.min(100, pet.stats.happiness + 10),
      },
      lastCleaned: new Date(),
    };
  }

  /**
   * 运动
   * @param pet - 当前宠物状态
   * @param exerciseAmount - 运动量
   */
  static exercise(pet: Pet, exerciseAmount: number): Pet {
    const newStats = { ...pet.stats };
    newStats.exerciseLevel = Math.min(100, newStats.exerciseLevel + exerciseAmount);
    newStats.energy = Math.max(0, newStats.energy - (exerciseAmount * 0.5));
    newStats.weight = Math.max(50, newStats.weight - (exerciseAmount * 0.1));

    return {
      ...pet,
      stats: newStats,
      lastExercise: new Date(),
    };
  }

  private static getFoodEnergy(foodType: FoodType): number {
    switch (foodType) {
      case FoodType.BREAD:
        return 30;
      case FoodType.FRUIT:
        return 20;
      case FoodType.WATER:
        return 10;
      case FoodType.CANDY:
        return 40;
      default:
        return 0;
    }
  }
} 