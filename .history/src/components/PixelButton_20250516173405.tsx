import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';

interface PixelButtonProps extends TouchableOpacityProps {
  title: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * 像素风格按钮组件
 */
const PixelButton: React.FC<PixelButtonProps> = ({
  title,
  containerStyle,
  textStyle,
  onPress,
  ...props
}) => {
  const animatedValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: animatedValue }],
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.button, containerStyle]}
        activeOpacity={0.7}
        {...props}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#2171C1',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});

export default PixelButton; 