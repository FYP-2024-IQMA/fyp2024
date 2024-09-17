import {Button, StyleSheet, Text, View} from 'react-native';

import React from 'react';
import {LogoutButton} from '@/components/LogoutButton';
import {router} from 'expo-router';

const testLesson = () => {
    router.push('SectionIntroduction');
};

const testQuiz = () => {
    router.push('VideoQuiz');
};

const testAsssessment = () => {
    router.push('RealityCheck');
};

const assessmentIntro = () => {
    router.push('AssessmentIntroduction');
};

const SettingPage: React.FC = () => (
    <View style={styles.container}>
        <Text>Settings Screen</Text>
        <View style={{marginBottom: 10}}></View>
        <Button title="Test Lesson" onPress={testLesson}></Button>
        <View style={{marginBottom: 10}}></View>
        <Button title="Test Quiz" onPress={testQuiz}></Button>
        <View style={{marginBottom: 10}}></View>
        <Button title="Test Assessment" onPress={testAsssessment}></Button>
        <View style={{marginBottom: 10}}></View>
        <Button title="Test Assessment Intro" onPress={assessmentIntro}></Button>
        <View style={{marginBottom: 10}}></View>
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
