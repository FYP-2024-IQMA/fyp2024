import { StyleSheet, Text, View ,Button,Alert} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import CustomSwitch from '@/components/CustomSwitch';
import { CustomButton } from '@/components/CustomButton';
import { AuthContext } from '@/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import {router}from 'expo-router';

export default function Settings() {
    const {logOut} = useContext(AuthContext);

    const [isSoundEffectsEnabled, setIsSoundEffectsEnabled] = useState(false);
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Get Settings from AsyncStorage
    const getSettingsData = async () => {
        try {
            const soundEffects = await AsyncStorage.getItem('soundEffects');
            const notifications = await AsyncStorage.getItem('notifications');

            if (soundEffects !== null) {
                const parsedSoundEffects = JSON.parse(soundEffects);
                setIsSoundEffectsEnabled(parsedSoundEffects);
            }
            if (notifications !== null) {
                const parsedNotifications = JSON.parse(notifications);
                setIsNotificationsEnabled(parsedNotifications);
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
    const toggleNotifications = async (value: boolean) => {
        setIsNotificationsEnabled(value);
        try {
            await AsyncStorage.setItem('notifications', JSON.stringify(value));
            console.log('Notifications setting saved!');
        } catch (e) {
            console.error('Error saving notifications setting:', e);
        }
    };

    // If still loading, show the loading indicator
    if (isLoading) {
        return <LoadingIndicator />;
    }

    return (
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
            <Button
        title="Press Me"
        onPress={() => router.push('EditProfile')}
      />

            <CustomButton
                label="Log out"
                backgroundColor="white"
                onPressHandler={logOut}
            />
        </View>
    );
}

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
