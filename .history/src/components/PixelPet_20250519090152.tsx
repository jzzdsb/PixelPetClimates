import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { PetMood } from '../types/Pet';

interface PixelPetProps {
  mood: PetMood;
  isNight: boolean;
  type: string;
}

/**
 * 像素风格宠物组件
 */
const PixelPet: React.FC<PixelPetProps> = ({ mood, isNight, type }) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 弹跳动画
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 旋转动画
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateY = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const getMoodColor = () => {
    switch (mood) {
      case PetMood.HAPPY:
        return '#FFD700';
      case PetMood.NORMAL:
        return '#90EE90';
      case PetMood.SAD:
        return '#87CEEB';
      case PetMood.ANGRY:
        return '#FF6B6B';
      case PetMood.SLEEPY:
        return '#DDA0DD';
      default:
        return '#90EE90';
    }
  };

  const getPetShape = () => {
    switch (type) {
      case 'cat':
        return styles.catShape;
      case 'dog':
        return styles.dogShape;
      default:
        return styles.catShape;
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { translateY },
            { rotate },
          ],
        },
      ]}
    >
      <View style={[styles.pet, getPetShape(), { backgroundColor: getMoodColor() }]}>
        <View style={styles.eyes}>
          <View style={[styles.eye, isNight && styles.nightEye]} />
          <View style={[styles.eye, isNight && styles.nightEye]} />
        </View>
        <View style={styles.mouth} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pet: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  catShape: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  dogShape: {
    borderRadius: 20,
  },
  eyes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 10,
  },
  eye: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
  },
  nightEye: {
    backgroundColor: '#FFD700',
  },
  mouth: {
    width: 20,
    height: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    borderRadius: 10,
  },
});

export default PixelPet; 