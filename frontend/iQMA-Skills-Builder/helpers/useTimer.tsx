import {useRef, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const useTimer = (event: string) => {
    const [seconds, setSeconds] = useState<number>(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        timerRef.current = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
    };

    const stopTimer = async () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }

        const userID = await AsyncStorage.getItem('userID');
        let age = await AsyncStorage.getItem('age');
        const section = await AsyncStorage.getItem('section');

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
                        age: age,
                        eventType: 'timeTaken',
                        section: section,
                        event: event,
                        timestamp: new Date().toISOString(),
                        time: `${seconds}`,
                    }
                );
                console.log(response.data);
            } catch (e: any) {
                console.error(e.response.data);
            }
        }
        setSeconds(0);
    };

    return {startTimer, stopTimer};
};
