import {
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    ScrollView,
    Linking,
} from 'react-native';
import React, {useContext, useEffect, useState, useCallback} from 'react';
import CustomSwitch from '@/components/CustomSwitch';
import {CustomButton} from '@/components/CustomButton';
import {AuthContext} from '@/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoadingIndicator} from '@/components/LoadingIndicator';
import {router} from 'expo-router';
import {Colors} from '@/constants/Colors';
import {globalStyles} from '@/constants/styles';
import {checkNotifications} from 'react-native-permissions';
import {useFocusEffect} from '@react-navigation/native';

export default function Settings() {
    const {logOut} = useContext(AuthContext);

    const [isSoundEffectsEnabled, setIsSoundEffectsEnabled] = useState(false);
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const getNotifications = () => {
        checkNotifications().then(({status}) => {
            if (status === 'granted') {
                setIsNotificationsEnabled(true);
            } else {
                setIsNotificationsEnabled(false);
            }
        });
    };

    const goToBadgePage = () => {
        router.push({
            pathname: 'Badge',
            params: {
                sectionID: "SEC0001",
                unitID: "UNIT0001",
                currentUnit: "UNIT0001",
                totalUnits: 7,
                currentProgress: 1,
                totalProgress: 5,
            },
        });
    }

<<<<<<< HEAD
const SettingPage: React.FC = () => (
    <View style={styles.container}>
        <Text>Settings Screen</Text>
        <View style={{marginBottom: 10}}></View>
        {/* <Button title="Test Lesson" onPress={testLesson}></Button>
        <View style={{marginBottom: 10}}></View>
        <Button title="Test Quiz" onPress={testQuiz}></Button>
        <View style={{marginBottom: 10}}></View>
        <Button title="Test Assessment" onPress={testAsssessment}></Button>
        <View style={{marginBottom: 10}}></View>
        <Button title="Test Assessment Intro" onPress={assessmentIntro}></Button>
        <View style={{marginBottom: 10}}></View> */}
        <LogoutButton></LogoutButton>
    </View>
);
=======
    // Get Settings from AsyncStorage
    const getSettingsData = async () => {
        try {
            const soundEffects = await AsyncStorage.getItem('soundEffects');

            if (soundEffects !== null) {
                const parsedSoundEffects = JSON.parse(soundEffects);
                setIsSoundEffectsEnabled(parsedSoundEffects);
            }
        } catch (e) {
            console.error('Error reading AsyncStorage values:', e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getSettingsData();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getNotifications();
        }, [])
    );

    // Auto save to AsyncStorage when user make changes
    const toggleSoundEffects = async (value: boolean) => {
        setIsSoundEffectsEnabled(value);
        try {
            await AsyncStorage.setItem('soundEffects', JSON.stringify(value));
            console.log('Sound Effects setting saved!');
        } catch (e) {
            console.error('Error saving sound effects setting:', e);
        }
    };

    // Auto save to AsyncStorage when user make changes
    const toggleNotifications = () => {
        Linking.openSettings();
        router.replace('Home');
    };

    // If still loading, show the loading indicator
    if (isLoading) {
        return <LoadingIndicator />;
    }

    return (
        <ScrollView style={globalStyles.container}>
            <View style={styles.container}>
                <Text style={styles.textHeading}>GENERAL</Text>
                <View style={styles.switchContainer}>
                    <Text style={styles.label}>Sound Effects</Text>
                    <CustomSwitch
                        isEnabled={isSoundEffectsEnabled}
                        onToggle={toggleSoundEffects}
                    />
                </View>

                <Text style={styles.textHeading}>NOTIFICATIONS</Text>
                <View style={styles.switchContainer}>
                    <Text style={styles.label}>All Notifications</Text>
                    <CustomSwitch
                        isEnabled={isNotificationsEnabled}
                        onToggle={toggleNotifications}
                    />
                </View>

                <CustomButton
                    label="Log out"
                    backgroundColor="white"
                    onPressHandler={logOut}
                />

                {/* <Button title="Go to Badge" onPress={goToBadgePage}></Button> */}
            </View>
        </ScrollView>
    );
}
>>>>>>> develop

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    textHeading: {
        color: Colors.default.purple500,
        fontWeight: 'bold',
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    label: {
        fontSize: 16,
    },
});
