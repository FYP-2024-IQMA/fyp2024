import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';
import {OverviewCard} from '@/components/OverviewCard';
import {router} from 'expo-router';

interface AchievementsProps {
    achievements: any[];
}

// default lockedUrl to use when latest unlocked badges is less than 3
const lockedUrl =
    'https://lugppkebziopzwushqcg.supabase.co/storage/v1/object/public/badges/locked.png';

export const Achievements: React.FC<AchievementsProps> = ({achievements}) => {
    console.log('achievements:', achievements);

    let firstThreeUnlocked: any[] = [];

    if (achievements.length !== 0) {
        firstThreeUnlocked = achievements[0]['badges']
            .filter(
                (badge: {badgeUrl: string}) =>
                    !badge.badgeUrl.endsWith('locked.png')
            )
            .slice(0, 3)
            .map((badge: {badgeUrl: string}) => badge.badgeUrl);

        while (firstThreeUnlocked.length < 3) {
            firstThreeUnlocked.push(lockedUrl);
        }

        console.log('here', firstThreeUnlocked);
    }

    const handlePress = () => {
        router.push('Achievements');
    };

    // console.log('topThreeAchievements:', topThreeAchievements);
    return (
        <View style={styles.outerContainer}>
            <View
                style={{flexDirection: 'row', justifyContent: 'space-between', flexWrap: "wrap"}}
            >
                <Text
                    style={[
                        styles.achievementsHeader,
                        firstThreeUnlocked.length === 0 &&
                            styles.achievementsError,
                    ]}
                >
                    Achievements
                </Text>
                <TouchableOpacity onPress={handlePress}>
                    <Text
                        style={{
                            textDecorationLine: 'underline',
                            textDecorationColor: '#5C5776',
                            fontWeight: 'bold',
                        }}
                    >
                        View all
                    </Text>
                </TouchableOpacity>
            </View>
            {firstThreeUnlocked.length === 0 && (
                <OverviewCard
                    text="Sorry, our system is currently under maintenance."
                    isError={true}
                />
            )}

            {firstThreeUnlocked.length > 0 && (
                <View style={styles.achievementsContainer}>
                    {firstThreeUnlocked.map(
                        (badgeUrl: any, index: number) => (
                            <View
                                key={index}
                                style={[
                                    styles.achievementImageContainer,
                                    index === 1 && styles.middleItemBorder,
                                ]}
                            >
                                <Image
                                    style={styles.achievementImage}
                                    source={{uri: badgeUrl}}
                                />
                            </View>
                        )
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#18113C',
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
    achievementsError: {
        marginBottom: 10,
    },
});

export default Achievements;
