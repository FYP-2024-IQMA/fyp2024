import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';

interface CustomSwitchProps {
  isEnabled: boolean;
  onToggle: (value: boolean) => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ isEnabled, onToggle }) => {
   
    const animationValue = useRef(new Animated.Value(isEnabled ? 1 : 0)).current;
  
    // Update the animation when isEnabled changes
    useEffect(() => {
      Animated.timing(animationValue, {
        toValue: isEnabled ? 1 : 0,
        duration: 300, 
        useNativeDriver: false,
      }).start();
    }, [isEnabled]);
  
    const interpolateBackgroundColor = animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['#ddd', '#7654F2'], // Off state to On state colors
    });
  
    const knobPosition = animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 21], // Left position for 'Off' and 'On'
    });
  
    return (
      <TouchableOpacity
        onPress={() => onToggle(!isEnabled)}
        style={styles.container}
        activeOpacity={0.8} // Prevent quick double-taps causing issues
      >
        <Animated.View
          style={[
            styles.switchBackground,
            { backgroundColor: interpolateBackgroundColor },
          ]}
        >
          <Animated.View
            style={[
              styles.switchKnob,
              { transform: [{ translateX: knobPosition }] },
            ]}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    switchBackground: {
      width: 50,
      height: 30,
      borderRadius: 15,
      justifyContent: 'center',
      padding: 2,
    },
    switchKnob: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: '#fff',
    },
  });
  
  export default CustomSwitch;
