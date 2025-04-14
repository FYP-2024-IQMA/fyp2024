import { StyleSheet, Text, View, Animated, Easing, ViewStyle } from 'react-native';
import React, { useEffect, useRef } from 'react';

interface StartLabelProps {
  style?: ViewStyle;
  text?: string;
}

const StartLabel: React.FC<StartLabelProps> = ({ style, text }) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -4, // move up by 5 pixels
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0, // move back down
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceAnim]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: bounceAnim }] }, style]}>
      {/* Rounded rectangle label */}
      <View style={styles.labelContainer}>
        {/* <Text style={styles.labelText}>START</Text> */}
        <Text style={styles.labelText}>{text}</Text>
      </View>
      {/* Triangle below the label */}
      <View style={styles.triangle}>
        <View style={styles.triangleInner} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  labelContainer: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    color: '#A784F3',
    fontWeight: 'bold',
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#D3D3D3',
    transform: [{ translateY: -1 }],
  },
  triangleInner: {
    width: 0,
    height: 0,
    borderLeftWidth: 9,
    borderRightWidth: 9,
    borderTopWidth: 9,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#F5F5F5',
    position: 'absolute',
    top: -11,
    left: -9,
  },
});

export default StartLabel;