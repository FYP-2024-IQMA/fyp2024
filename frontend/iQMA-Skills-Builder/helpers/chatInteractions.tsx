import {useRef, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const chatInteractions = async (
    section: string,
    unit: string,
    count: number
) => {
    const userID = await AsyncStorage.getItem('userID');
    let age = await AsyncStorage.getItem('age');

    if (age === null) {
        try {
            const ageResponse = await axios.get(
                `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accounts/getaccountbyid/${userID}`
            );
            await AsyncStorage.setItem('age', ageResponse.data['age']);
        } catch (e) {
            console.error(e);
        }
    } else {
        try {
            const response = await axios.post(
                `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/clickstream/sendMessage`,
                {
                    userID: userID,
                    eventType: 'numberOfInteractions',
                    sectionID: section,
                    unitID: unit,
                    timestamp: new Date().toISOString(),
                    count: count,
                }
            );
            console.log(response.data);
            console.log('number of interactions event type');
            console.log('added number of interactions:', count);
        } catch (e) {
            console.error(e);
        }
    }
};

export const chatResponseTime = async (
    section: string,
    unit: string,
    duration: number
) => {
    const userID = await AsyncStorage.getItem('userID');
    let age = await AsyncStorage.getItem('age');

    if (age === null) {
        try {
            const ageResponse = await axios.get(
                `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accounts/getaccountbyid/${userID}`
            );
            await AsyncStorage.setItem('age', ageResponse.data['age']);
        } catch (e) {
            console.error(e);
        }
    } else {
        try {
            const response = await axios.post(
                `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/clickstream/sendMessage`,
                {
                    userID: userID,
                    eventType: 'chatResponseTime',
                    sectionID: section,
                    unitID: unit,
                    timestamp: new Date().toISOString(),
                    duration: duration,
                }
            );
            console.log(response.data);
            console.log('chat response time event type');
            console.log('added chat response time:', duration);
        } catch (e) {
            console.error(e);
        }
    }
};
