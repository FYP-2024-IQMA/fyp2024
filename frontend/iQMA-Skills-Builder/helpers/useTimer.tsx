import {useRef, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const useTimer = (
    sectionID: string,
    event: string,
    unitID?: string | null,
    lessonID?: string | null
) => {
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

        try {
            const response = await axios.post(
                `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/clickstream/sendMessage`,
                {
                    userID: userID,
                    eventType: 'timeTaken',
                    timestamp: new Date().toISOString(),
                    sectionID: sectionID,
                    unitID: unitID ?? null,
                    lessonID: lessonID ?? null,
                    event: event,
                    time: seconds,
                }
            );
            console.log(response.data);
        } catch (e) {
            console.error(e);
        }
        setSeconds(0);
    };

    return {startTimer, stopTimer};
};
