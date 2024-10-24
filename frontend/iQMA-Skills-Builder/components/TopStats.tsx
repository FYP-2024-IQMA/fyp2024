// components/TopStats.tsx

import {Image, StyleSheet, Text, View} from 'react-native';

import CircularProgress from './CircularProgress';
import {Colors} from '@/constants/Colors';
import React from 'react';

interface TopStatsProps {
    circularProgress: number;
    points: number;
    streak: number;
}

const TopStats: React.FC<TopStatsProps> = ({
    circularProgress,
    points,
    streak,
}) => {
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
                        <Text style={styles.statNumber}>{streak}</Text>
                        <Text style={styles.statLabel}>Day streak</Text>
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
                        <Text style={styles.statNumber}>{points}</Text>
                        <Text style={styles.statLabel}>Total XP</Text>
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
                    <Text style={styles.statLabelRight}>
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
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    sectionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        flex: 1
    },
    statIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    statNumber: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333',
    },
    statLabel: {
        fontSize: 10,
        color: '#333',
    },
    statLabelRight: {
        fontSize: 10,
        color: '#333',
    },
});

export default TopStats;
