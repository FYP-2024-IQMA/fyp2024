import {Button, StyleSheet, Text, View, Switch} from 'react-native';
import React, {useContext, useState} from 'react';
import {router} from 'expo-router';
import CustomSwitch from '@/components/CustomSwitch';
import {CustomButton} from '@/components/CustomButton';
import {AuthContext} from '@/context/AuthContext';

export default function Settings() {
    const {logOut, currentUser} = useContext(AuthContext);

    const [isSoundEffectsEnabled, setIsSoundEffectsEnabled] = useState(false);
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

    const toggleSoundEffects = (value: boolean) => {
        setIsSoundEffectsEnabled(value);
    };

    const toggleNotifications = (value: boolean) => {
        setIsNotificationsEnabled(value);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textHeading}>GENERAL</Text>
            <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}
            >
                <Text style={{alignSelf: 'center'}}>Sound Effects</Text>
                <CustomSwitch
                    isEnabled={isSoundEffectsEnabled}
                    onToggle={toggleSoundEffects}
                />
            </View>
            <Text style={styles.textHeading}>NOTIFICATIONS</Text>
            <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}
            >
                <Text style={{alignSelf: 'center'}}>All Notifications</Text>
                <CustomSwitch
                    isEnabled={isNotificationsEnabled}
                    onToggle={toggleNotifications}
                />
            </View>
            <CustomButton label="Save" backgroundColor="white" />

            <CustomButton label="Help Center" backgroundColor="white" />

            <CustomButton label="Feedback" backgroundColor="white" />

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
        color: '#7654F2',
        fontWeight: 'bold',
    },
});
