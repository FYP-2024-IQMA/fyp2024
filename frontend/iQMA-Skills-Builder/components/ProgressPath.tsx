// components/ProgressPath.tsx

import { Image, StyleSheet, View } from 'react-native';

import React from 'react';

interface ProgressPathProps {
  icons: string[];  // Array of icon URLs or paths
}

const ProgressPath: React.FC<ProgressPathProps> = ({ icons }) => {
  return (
    <View style={styles.progressContainer}>
      {icons.map((icon, index) => (
        <Image key={index} source={{ uri: icon }} style={styles.progressIcon} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  progressIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
});

export default ProgressPath;
