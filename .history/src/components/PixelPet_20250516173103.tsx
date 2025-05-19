import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';
import { PetMood } from '../types/Pet';

interface PixelPetProps {
  mood: PetMood;
  isNight: boolean;
  type: string;
}

/**
 * 像素宠物组件
 */
const PixelPet: React.FC<PixelPetProps> = ({ mood, isNight, type }) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 弹跳动画
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
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

    // 漂浮动画
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 5,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: -5,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    // 心情变化动画
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [mood]);

  // 根据心情和时间获取对应的图片
  const getPetImage = () => {
    if (type === 'cat') {
      switch (mood) {
        case PetMood.HAPPY:
          return require('../assets/images/pets/cat_happy.png');
        case PetMood.NORMAL:
          return require('../assets/images/pets/cat_normal.png');
        case PetMood.SAD:
          return require('../assets/images/pets/cat_sad.png');
        case PetMood.ANGRY:
          return require('../assets/images/pets/cat_angry.png');
        default:
          return require('../assets/images/pets/cat_normal.png');
      }
    }
    return require('../assets/images/pets/cat_normal.png');
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.petContainer,
          {
            transform: [
              { translateY: bounceAnim },
              { translateX: floatAnim },
              { scale: scaleAnim },
            ],
          },
        ]}
      >
        <Image
          source={getPetImage()}
          style={[
            styles.petImage,
            isNight && styles.nightFilter,
          ]}
        />
      </Animated.View>
      {/* 添加阴影效果 */}
      <View style={[
        styles.shadow,
        { opacity: Animated.subtract(1, Animated.divide(bounceAnim, -10)) }
      ]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  petContainer: {
    width: 100,
    height: 100,
  },
  petImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  nightFilter: {
    tintColor: '#666',
    opacity: 0.8,
  },
  shadow: {
    position: 'absolute',
    bottom: 0,
    width: 60,
    height: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 30,
    transform: [{ scaleX: 2 }],
  },
});

export default PixelPet; 