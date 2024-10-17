import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';

interface Badge {
    unitName: string;
    badgeUrl: string;
}

interface badgeProps {
    sectionID: string;
    badges: Badge[];
}

interface AchievementsProps {
    achievements: any[];
}

export const Achievements: React.FC<AchievementsProps> = ({achievements}) => {
    // const achievements = [
    //     'https://lugppkebziopzwushqcg.supabase.co/storage/v1/object/public/badges/badge3.png',
    //     'https://lugppkebziopzwushqcg.supabase.co/storage/v1/object/public/badges/badge1.png',
    //     'https://lugppkebziopzwushqcg.supabase.co/storage/v1/object/public/badges/badge2.png',
    // ];

    const [topThreeAchievements, setTopThreeAchievements] = useState<any>();

        // const displayAchievements = [...achievements];
        // const placeholderUri =
        //     'https://lugppkebziopzwushqcg.supabase.co/storage/v1/object/public/badges/placeholder.png';

        // const lockedBadge = require('../assets/images/lockedbadge.png');

        // while (achievements.length < 3) {
        //     achievements.push(lockedBadge);
        // }

        // const topThreeAchievements = achievements[0]["badges"].slice(0, 3);
        
        useEffect(() => {
            // setTopThreeAchievements(achievements[0].badges.slice(0, 3));
        }, []);
    
    // console.log(topThreeAchievements)

    // console.log('topThreeAchievements:', achievements[0].badges);

    // const topThreeAchievements = achievements[0].badges.slice(0, 3);

    // topThreeAchievements.map((badge) => badge.badgeUrl);

    // console.log('topThreeAchievements:', topThreeAchievements);
    return (
        <View style={styles.outerContainer}>
            <Text style={styles.achievementsHeader}>Achievements</Text>
            <View style={styles.achievementsContainer}>
                {/* {topThreeAchievements.map((achievementUri, index) => (
                    <View
                        key={index}
                        style={[
                            styles.achievementImageContainer,
                            index === 1 && styles.middleItemBorder,
                        ]}
                    >
                        <Image
                            style={styles.achievementImage}
                            source={{uri: achievementUri}}
                        />
                    </View>
                ))} */}
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
