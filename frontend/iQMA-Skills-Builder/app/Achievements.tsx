import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import {useState, useContext, useEffect} from 'react';
import {AuthContext} from '@/context/AuthContext';
import {LoadingIndicator} from '@/components/LoadingIndicator';
import * as gamificationEndpoints from '@/helpers/gamificationEndpoints';
import {Colors} from '@/constants/Colors';
import { formatSection } from '@/helpers/formatSectionID';
import { globalStyles } from '@/constants/styles';
import React from 'react';

export default function Achievements() {
    const {currentUser} = useContext(AuthContext);
    const [badges, setBadges] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const mock = [
        {
            sectionID: 'SEC0001',
            badges: [
                {
                    unitName: 'Foundations of Communication',
                    badgeUrl:
                        'https://lugppkebziopzwushqcg.supabase.co/storage/v1/object/public/badges/placeholder.png',
                },
                {
                    unitName: 'Written Communication Proficiency',
                    badgeUrl:
                        'https://lugppkebziopzwushqcg.supabase.co/storage/v1/object/public/badges/placeholder.png',
                },
                {
                    unitName: 'Visual Communication Strategies',
                    badgeUrl:
                        'https://lugppkebziopzwushqcg.supabase.co/storage/v1/object/public/badges/placeholder.png',
                },
                {
                    unitName: 'Stakeholder Analysis and Audience Engagement',
                    badgeUrl:
                        'https://lugppkebziopzwushqcg.supabase.co/storage/v1/object/public/badges/placeholder.png',
                },
                {
                    unitName: 'Interpersonal Communication Excellence',
                    badgeUrl:
                        'https://lugppkebziopzwushqcg.supabase.co/storage/v1/object/public/badges/SEC0001/unit3.png',
                },
                {
                    unitName: 'Mastering Two-Way Communication',
                    badgeUrl:
                        'https://lugppkebziopzwushqcg.supabase.co/storage/v1/object/public/badges/SEC0001/unit2.png',
                },
                {
                    unitName: 'The Art of Persuasion',
                    badgeUrl:
                        "https://lugppkebziopzwushqcg.supabase.co/storage/v1/object/public/badges/locked.png",
                },
            ],
        },
        {
            sectionID: 'SEC0002',
            badges: [
                {
                    unitName: 'Foundations of Communication',
                    badgeUrl:
                        'https://lugppkebziopzwushqcg.supabase.co/storage/v1/object/public/badges/placeholder.png',
                },
                {
                    unitName: 'Written Communication Proficiency',
                    badgeUrl:
                        "https://lugppkebziopzwushqcg.supabase.co/storage/v1/object/public/badges/locked.png",
                },
                {
                    unitName: 'Visual Communication Strategies',
                    badgeUrl:
                        "https://lugppkebziopzwushqcg.supabase.co/storage/v1/object/public/badges/locked.png",
                },
            ],
        },
    ];

    const fetchAchievements = async () => {
        try {
            const badges = await gamificationEndpoints.getBadges(
                currentUser.sub
            );

            setBadges(badges);

            console.log(badges);
        } catch (error) {
            console.error('Error fetching achievements', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAchievements();
    }, []);

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <ScrollView style={globalStyles.container}>
            <View style={styles.container}>
                {badges.map((section) => (
                        <View style={styles.sectionContainer} key={section.sectionID}>
                            <Text style={styles.sectionHeading}>
                                {/* {section.sectionID} */}
                                Section {formatSection(section.sectionID)}
                            </Text>
                            <View
                                key={section.sectionID}
                                style={styles.badgeOuterContainer}
                            >
                                {section.badges.map(
                                    (badge: {
                                        badgeUrl: string;
                                        unitName: string;
                                    }, index: number) => (
                                        <View style={styles.badgeContainer} key={badge.unitName}>
                                            <Image
                                                source={{uri: badge.badgeUrl}}
                                                style={styles.badgeImage}
                                            />
                                            {/* <Text style={styles.unlockedBadgeText}> */}
                                            <Text
                                                style={
                                                    badge.badgeUrl.endsWith(
                                                        'locked.png'
                                                    )
                                                        ? styles.lockedBadgeText
                                                        : styles.unlockedBadgeText
                                                }
                                            >
                                                {badge.unitName}
                                            </Text>
                                        </View>
                                    )
                                )}
                            </View>
                        </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    sectionContainer: {
        marginTop: 20,
    },
    sectionHeading: {
        color: Colors.light.color,
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: "center"
    },
    badgeOuterContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
        // backgroundColor: 'red',
    },
    badgeImage: {
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    badgeContainer: {
        width: '30%',
        marginBottom: 20,
        alignItems: 'center',
    },
    unlockedBadgeText: {
        marginTop: 10,
        textAlign: 'center',
        // color: Colors.light.text,
        color: Colors.default.purple500,
        fontWeight: 'bold',
    },
    lockedBadgeText: {
        marginTop: 10,
        textAlign: 'center',
        color: Colors.light.text,
        fontWeight: 'bold',
    },
});
