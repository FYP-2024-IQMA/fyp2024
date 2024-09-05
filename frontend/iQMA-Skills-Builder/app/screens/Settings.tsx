import {Button, StyleSheet, Text, View} from 'react-native';

import React from 'react';
import {LogoutButton} from '@/components/LogoutButton';
import { router } from 'expo-router';

const testLesson = () => {
    router.push("SectionIntroduction");
}

const SettingPage: React.FC = () => (
    <View style={styles.container}>
        <Text>Settings Screen</Text>
        <View style={{marginTop: 10}}></View>
        <Button title="Test Lesson" onPress={testLesson}></Button>
        <View style={{marginTop: 10}}></View>
        <LogoutButton></LogoutButton>
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
