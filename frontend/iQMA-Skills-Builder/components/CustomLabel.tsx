import { StyleSheet, Text, View } from "react-native";

import React from "react";

interface CustomLabelProps {
  label: string;
  color: string;
}

const CustomLabel: React.FC<CustomLabelProps> = ({ label, color }) => {
  // Split the label into two lines at the colon ":"
  const [firstLine, secondLine] = label.split(": ");

  return (
    <View style={styles.labelContainer}>
      <Text style={[styles.labelText, { color }]}>{firstLine}:</Text>
      <Text style={[styles.labelText, { color }]}>{secondLine}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: "column",
    // alignItems: 'flex-start',
  },
  labelText: {
    fontSize: 14,
    lineHeight: 18,
    flex: 1,
    marginLeft: -20,
  },
});

export default CustomLabel;
