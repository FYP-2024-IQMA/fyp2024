import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const getBadges = async (userID: string) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accounts/badges/${userID}`;
        const response = await fetch(url);
        const badges = await response.json();
        return badges;
    } catch (error) {
        console.error('Error fetching badges:', error);
        return [];
    }
}

export const getStreak = async (userID: string) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accounts/gamificationdata/${userID}`;
        const response = await fetch(url);
        const streak = await response.json();
        return streak;
    } catch (error) {
        console.error('Error fetching Streak:', error);
        return [];
    }
};

export const updatePoints = async (userID: string, points: number) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accounts/updatepoints`;

        const data = {
            userID: userID,
            points: points,
        };

        const response = await axios.patch(url, data);
        const result = await response.data;
        console.log('Points successfully updated:', result);
        AsyncStorage.setItem('totalPoints', '0');
    } catch (error: any) {
        console.error('Error updating points:', error.response.data);
    }
};

export const getLeaderboard = async (userID: string) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accounts/leaderboard/${userID}`;

       

        const response = await axios.get(url);
        const result = await response.data;
       return result;
      
    } catch (error: any) {
        console.error('Error updating points:', error.response.data);
    }
};

