// screens/HomeScreen.tsx

import { ScrollView, StyleSheet, Text, View } from 'react-native';

import ProgressPath from '@/components/ProgressPath';
import SectionCard from '@/components/SectionCard';
import TopStats from '@/components/TopStats';
import { useState } from "react";

const HomeScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Stats */}
      <TopStats />

      {/* Section 1 */}
      <SectionCard title="SECTION 1, UNIT 1" subtitle="Foundations of Communication" />
      <ProgressPath icons={[
        // 'https://link-to-your-icon/start-icon.png',
        // 'https://link-to-your-icon/next-icon.png',
        // 'https://link-to-your-icon/next-icon.png',
        // 'https://link-to-your-icon/owl-icon.png',
      ]} />

      {/* Divider */}
      <View style={styles.lineSeparator} />
      <Text style={styles.sectionLabel}>Written Communication Proficiency</Text>

      {/* Section 2 */}
      <SectionCard title="SECTION 1, UNIT 2" subtitle="Written Communication Proficiency" />
      <ProgressPath icons={[
        // 'https://link-to-your-icon/next-icon.png',
        // 'https://link-to-your-icon/next-icon.png',
        // 'https://link-to-your-icon/next-icon.png',
        // 'https://link-to-your-icon/next-icon.png',
      ]} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  lineSeparator: {
    height: 1,
    backgroundColor: '#CCC',
    marginVertical: 10,
  },
  sectionLabel: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
});

export default HomeScreen;
