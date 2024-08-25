import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";

export const LogoVisual = () => {
  const scaleValue = useRef(new Animated.Value(0.8)).current; // Initial scale set to 0.5 (half the size)

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1, // Scale to full size
      duration: 2000, // Animation duration (in milliseconds)
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale: scaleValue }] }]}
    >
      <Animated.Image
        source={require("../assets/images/iqma_logo.png")}
        style={[styles.logo]} // Apply scale transform
      />
      <Text style={styles.text}>Leadership Skills For A New Self</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60,
  },
  logo: {
    width: 160,
    height: 160,
  },
  text: {
    fontSize: 14,
    color: "#FFF",
    opacity: 0.8,
    textAlign: "center",
  },
});
