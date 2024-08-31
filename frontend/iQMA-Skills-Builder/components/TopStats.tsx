// components/TopStats.tsx

import {Image, StyleSheet, Text, View} from 'react-native';

import CircularProgress from './CircularProgress';
import React from 'react';

const TopStats: React.FC = () => {
    const progress = 70; // change this to edit the circular progress

    return (
        <View style={styles.statsContainer}>
            <View style={[styles.statBox, styles.leftStatBox]}>
                <View style={styles.statContent}>
                    <Image
                        source={require('@/assets/images/fire.png')}
                        style={styles.statIcon}
                    />
                    <View>
                        <Text style={styles.statNumber}>5</Text>
                        <Text style={styles.statLabel}>Day streak</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.statBox, styles.rightStatBox]}>
                <CircularProgress
                    size={38}
                    strokeWidth={5}
                    progress={progress}
                />
                <Text style={styles.statLabelRight}>
                    Section{'\n'}Completion
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    statsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        // paddingHorizontal: 5,
    },
    statBox: {
        padding: 5,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#B199FF',
        marginHorizontal: 5,
        height: 52,
        width: 120,
    },
    leftStatBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightStatBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statIcon: {
        width: 15,
        height: 15,
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
        marginLeft: 5,
    },
});

export default TopStats;