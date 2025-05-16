import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import { Pet, FoodType } from '../types/pet';
import { WeatherType } from '../types/weather';

interface ControlPanelProps {
  pet: Pet;
  weather: WeatherType;
  onFeed: (foodType: FoodType) => void;
  onClean: () => void;
  onPlay: () => void;
  onCare: () => void;
}

/**
 * 控制面板组件 - 提供玩家与宠物互动的按钮
 */
const ControlPanel: React.FC<ControlPanelProps> = ({
  pet,
  weather,
  onFeed,
  onClean,
  onPlay,
  onCare,
}) => {
  const showFoodMenu = () => {
    Alert.alert(
      '选择食物',
      '请选择要喂食的食物类型',
      [
        {
          text: '面包 🍞',
          onPress: () => onFeed(FoodType.BREAD),
        },
        {
          text: '水果 🍎',
          onPress: () => onFeed(FoodType.FRUIT),
        },
        {
          text: '水 💧',
          onPress: () => onFeed(FoodType.WATER),
        },
        {
          text: '糖果 🍬',
          onPress: () => onFeed(FoodType.CANDY),
        },
        {
          text: '取消',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const isButtonDisabled = (type: 'feed' | 'clean' | 'play') => {
    const now = new Date();
    switch (type) {
      case 'feed':
        return (now.getTime() - pet.lastFed.getTime()) < 1800000; // 30分钟冷却
      case 'clean':
        return (now.getTime() - pet.lastCleaned.getTime()) < 3600000; // 1小时冷却
      case 'play':
        return (now.getTime() - pet.lastExercise.getTime()) < 3600000; // 1小时冷却
      default:
        return false;
    }
  };

  const getButtonStyle = (type: 'feed' | 'clean' | 'play') => {
    return isButtonDisabled(type)
      ? [styles.button, styles.buttonDisabled]
      : styles.button;
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={getButtonStyle('feed')}
          onPress={showFoodMenu}
          disabled={isButtonDisabled('feed')}
        >
          <Text style={styles.buttonText}>喂食 🍽️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={getButtonStyle('clean')}
          onPress={onClean}
          disabled={isButtonDisabled('clean')}
        >
          <Text style={styles.buttonText}>清洁 🧹</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={getButtonStyle('play')}
          onPress={onPlay}
          disabled={isButtonDisabled('play')}
        >
          <Text style={styles.buttonText}>玩耍 🎮</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onCare}>
          <Text style={styles.buttonText}>安抚 ❤️</Text>
        </TouchableOpacity>
      </ScrollView>

      {weather !== WeatherType.SUNNY && (
        <View style={styles.weatherWarning}>
          <Text style={styles.warningText}>
            {weather === WeatherType.RAINY
              ? '下雨天记得带伞！'
              : weather === WeatherType.SNOWY
              ? '下雪天要保暖哦！'
              : '天气不太好，要照顾好宠物！'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  weatherWarning: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#FFE082',
    borderRadius: 12,
  },
  warningText: {
    color: '#5D4037',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default ControlPanel; 