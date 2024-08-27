import { StyleSheet, Text, View, ViewStyle } from "react-native";

import React from "react";

interface StartLabelProps {
  style?: ViewStyle;
}

const StartLabel: React.FC<StartLabelProps> = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      {/* Rounded rectangle label */}
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>START</Text>
      </View>
      {/* Triangle below the label */}
      <View style={styles.triangle}>
        <View style={styles.triangleInner} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  labelContainer: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: "#D3D3D3",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  labelText: {
    color: "#A784F3",
    fontWeight: "bold",
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#D3D3D3",
    transform: [{ translateY: -1 }],
  },
  triangleInner: {
    width: 0,
    height: 0,
    borderLeftWidth: 9,
    borderRightWidth: 9,
    borderTopWidth: 9,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#F5F5F5",
    position: "absolute",
    top: -11,
    left: -9,
  },
});

export default StartLabel;
