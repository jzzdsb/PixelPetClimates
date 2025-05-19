/*
 * @Author: vic
 * @Date: 2025-05-16 17:31:34
 * @LastEditors: vic
 * @LastEditTime: 2025-05-19 09:02:30
 * @Description: 
 */
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface GameBackgroundProps {
  isNight: boolean;
}

/**
 * 游戏背景组件
 */
const GameBackground: React.FC<GameBackgroundProps> = ({ isNight }) => {
  const fadeAnim = useRef(new Animated.Value(isNight ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isNight ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [isNight]);

  return (
    <View style={styles.container}>
      {/* 白天背景 */}
      <View style={[styles.background, styles.dayBackground]} />
      
      {/* 夜晚背景 */}
      <Animated.View 
        style={[
          styles.background,
          styles.nightBackground,
          { opacity: fadeAnim }
        ]}
      >
        {/* 星星 */}
        {Array.from({ length: 20 }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.star,
              {
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
              },
            ]}
          />
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  dayBackground: {
    backgroundColor: '#87CEEB',
  },
  nightBackground: {
    backgroundColor: '#1a1a2e',
  },
  star: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 50,
  },
});

export default GameBackground; 