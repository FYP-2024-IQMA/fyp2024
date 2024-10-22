import {StyleSheet, Text, View, Button, Alert, ScrollView, Linking} from 'react-native';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import CustomSwitch from '@/components/CustomSwitch';
import {CustomButton} from '@/components/CustomButton';
import {AuthContext} from '@/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoadingIndicator} from '@/components/LoadingIndicator';
import {router} from 'expo-router';
import {Colors} from '@/constants/Colors';
import {globalStyles} from '@/constants/styles';
import {checkNotifications} from 'react-native-permissions';
import { useFocusEffect } from '@react-navigation/native';

export default function Leaderboard() {
    
    return(
        <ScrollView style={globalStyles.container}>
            <View style={{paddingHorizontal: 20, marginVertical: 20}}>
                <Text>Leaderboard Screen</Text>
            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({

});
