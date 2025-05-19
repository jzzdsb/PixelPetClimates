import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle,
  Animated,
  Pressable
} from 'react-native';

interface PixelButtonProps {
  title: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

/**
 * 像素风格按钮组件
 */
const PixelButton: React.FC<PixelButtonProps> = ({
  title,
  onPress,
  containerStyle,
  textStyle,
  disabled = false,
}) => {
  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled}
    >
      <Animated.View
        style={[
          styles.container,
          containerStyle,
          { transform: [{ scale }] },
          disabled && styles.disabled,
        ]}
      >
        <Text style={[styles.text, textStyle, disabled && styles.disabledText]}>
          {title}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#2c5282',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  disabled: {
    backgroundColor: '#a0aec0',
    borderColor: '#718096',
    shadowOpacity: 0.1,
  },
  disabledText: {
    color: '#e2e8f0',
  },
});

export default PixelButton; 