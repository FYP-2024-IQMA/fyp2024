// components/TopStats.tsx

import * as gamificationEndpoints from '@/helpers/gamificationEndpoints';

import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import {AuthContext} from '@/context/AuthContext';
import CircularProgress from './CircularProgress';
import {Colors} from '@/constants/Colors';
import {useContext} from 'react';
import {useFocusEffect} from 'expo-router';

interface TopStatsProps {
    circularProgress: number;
}

const TopStats: React.FC<TopStatsProps> = ({circularProgress}) => {
    const {currentUser, isLoading} = useContext(AuthContext);
    const [updatedStreak, setUpdatedStreak] = useState<number>(0);
    const [updatedPoints, setUpdatedPoints] = useState<number>(0);
    const [key, setKey] = useState(0);


    useEffect(() => {
        const updateStreak = async () => {
            try {
                const updated = await gamificationEndpoints.updateStreakInLogin(
                    currentUser.sub
                );
                const getStreak = await gamificationEndpoints.getStreak(
                    currentUser.sub
                );
                console.log(getStreak);
                setUpdatedStreak(getStreak.streaks);
                setUpdatedPoints(getStreak.points);
            } catch (error) {
                console.error('Error updating streak:', error);
            }
        };

        updateStreak();
    }, [currentUser, key]);

    useFocusEffect(
        useCallback(() => {
            // Change the key to force a re-render
            setKey((prevKey) => prevKey + 1);
        }, [])
    );
    
    

    return (
        <View style={styles.statsContainer}>
            <View style={[styles.statBox]}>
                <View style={styles.statContent}>
                    <View>
                        <Image
                            source={require('@/assets/images/fire_icon.png')}
                            style={styles.statIcon}
                        />
                    </View>
                    <View>
                        <Text style={styles.statNumber} allowFontScaling={false}>{updatedStreak}</Text>
                        <Text style={styles.statLabel} allowFontScaling={false}>Day streak</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.statBox]}>
                <View style={styles.statContent}>
                    <View>
                        <Image
                            source={require('@/assets/images/xp_icon.png')}
                            style={styles.statIcon}
                        />
                    </View>
                    <View>
                        <Text style={styles.statNumber} allowFontScaling={false}>{updatedPoints}</Text>
                        <Text style={styles.statLabel} allowFontScaling={false}>Total XP</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.statBox]}>
                <View style={styles.sectionContent}>
                    <CircularProgress
                        size={40}
                        strokeWidth={5}
                        progress={circularProgress}
                    />
                    <Text style={styles.statLabelRight} allowFontScaling={false}>
                        Section{'\n'}Completion
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    statsContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20,
        gap: 10,
        
    },
    statBox: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.default.purple100,
        // backgroundColor: "red"
    },
    statContent: {
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        gap: 2
    },
    sectionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        flex: 1,
        flexWrap: "wrap"
    },
    statIcon: {
        width: 30,
        height: 30,
        // marginRight: 10,
    },
    statNumber: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333',
        flexShrink: 1
    },
    statLabel: {
        fontSize: 10,
        color: '#333',
        flexShrink: 1
    },
    statLabelRight: {
        fontSize: 10,
        color: '#333',
        flexShrink: 1
    },
});

export default TopStats;
