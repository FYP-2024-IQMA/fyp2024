import React, {useState} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';

export const Achievements = () => {
    const achievements = [
        'https://lugppkebziopzwushqcg.supabase.co/storage/v1/object/public/badges/badge3.png',
        'https://lugppkebziopzwushqcg.supabase.co/storage/v1/object/public/badges/badge1.png',
        // 'https://lugppkebziopzwushqcg.supabase.co/storage/v1/object/public/badges/badge2.png',
    ];

    const displayAchievements = [...achievements];
    // const placeholderUri =
    //     'https://lugppkebziopzwushqcg.supabase.co/storage/v1/object/public/badges/placeholder.png';

    const lockedBadge = require('../assets/images/lockedbadge.png');

    while (displayAchievements.length < 3) {
        displayAchievements.push(lockedBadge);
    }

    return (
        <View style={styles.outerContainer}>
            <Text style={styles.achievementsHeader}>Achievements</Text>
            <View style={styles.achievementsContainer}>
                {displayAchievements
                    .slice(0, 3)
                    .map((achievementUri, index) => (
                        <View
                            key={index}
                            style={[
                                styles.achievementImageContainer,
                                index === 1 && styles.middleItemBorder,
                            ]}
                        >
                            <Image
                                style={styles.achievementImage}
                                source={
                                    typeof achievementUri === 'string'
                                        ? {uri: achievementUri}
                                        : achievementUri
                                }
                            />
                        </View>
                    ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    achievementsHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#18113C',
    },
    achievementsContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#5C5776',
        borderRadius: 10,
        marginTop: 10,
    },
    achievementImageContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 5,
    },
    middleItemBorder: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#5C5776',
    },
    achievementImage: {
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'contain',
    },
});

export default Achievements;
