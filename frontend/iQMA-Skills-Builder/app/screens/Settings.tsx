import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

const SettingPage: React.FC = () => (
  <View style={styles.container}>
    <Text>Settings Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingPage;
