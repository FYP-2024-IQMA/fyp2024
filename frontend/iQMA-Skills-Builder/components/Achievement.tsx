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

interface AchievementsProps {
    achievements: any[];
}

export const Achievements: React.FC<AchievementsProps> = ({achievements}) => {
    // console.log('achievements:', achievements);

    let topThreeAchievements: any[] = [];

    if (achievements.length !== 0) {
        let topThreeAchievements = achievements[0]['badges'].slice(0, 3);

        topThreeAchievements = topThreeAchievements.map(
            (badge: any) => badge.badgeUrl
        );
    }

    // console.log('topThreeAchievements:', topThreeAchievements);
    return (
        <View style={styles.outerContainer}>
            <Text
                style={[
                    styles.achievementsHeader,
                    topThreeAchievements.length === 0 &&
                        styles.achievementsError,
                ]}
            >
                Achievements
            </Text>
            {topThreeAchievements.length === 0 && (
                <OverviewCard
                    text="Sorry, our system is currently under maintenance."
                    isError={true}
                />
            )}

            {topThreeAchievements.length > 0 && (
                <View style={styles.achievementsContainer}>
                    {topThreeAchievements.map(
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
