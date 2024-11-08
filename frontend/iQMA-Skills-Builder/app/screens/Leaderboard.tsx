import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext} from '@/context/AuthContext';
import {LoadingIndicator} from '@/components/LoadingIndicator';
import {getLeaderboard} from '@/helpers/gamificationEndpoints';
import {globalStyles} from '@/constants/styles';
import {Colors} from '@/constants/Colors';
import {useFocusEffect} from 'expo-router';

interface User {
    name: string;
    points: number;
    rank: number;
    profilePic: string;
}

export default function Leaderboard() {
    const {currentUser} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [currentUserRankDetails, setCurrentUserRankDetails] =
        useState<User | null>(null);
    const [leaderboard, setLeaderboard] = useState<User[]>([]);

    // Fetch data when screen is Focused
    useFocusEffect(
        useCallback(() => {
            fetchLeaderboardData();
        }, [])
    );

    const fetchLeaderboardData = async () => {
        try {
            const response = await getLeaderboard(currentUser.sub);
            setCurrentUserRankDetails(response.user);
            setLeaderboard(response.top5);
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaderboardData();
    }, []);

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <ScrollView style={globalStyles.container}>
            <View style={styles.leaderboard}>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.title}>Top 5 Learners</Text>
                </View>
                {leaderboard &&
                    leaderboard.map((user: User, index) => {
                        return (
                            <View
                                key={index}
                                style={[
                                    styles.itemContainer,
                                    currentUserRankDetails?.profilePic ===
                                        user.profilePic && styles.currentUser,
                                ]}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        flex: 1,
                                        alignItems: 'center',
                                        gap: 10,                           
                                    }}
                                >
                                    {user.rank === 1 ? (
                                        <Image
                                            source={require('@/assets/images/gold.png')}
                                            style={styles.rankImage}
                                        />
                                    ) : user.rank === 2 ? (
                                        <Image
                                            source={require('@/assets/images/silver.png')}
                                            style={styles.rankImage}
                                        />
                                    ) : user.rank === 3 ? (
                                        <Image
                                            source={require('@/assets/images/bronze.png')}
                                            style={styles.rankImage}
                                        />
                                    ) : (
                                        <View
                                            style={{justifyContent: 'center'}}
                                        >
                                            <Text style={styles.rank} allowFontScaling={false}>
                                                {user.rank}
                                            </Text>
                                        </View>
                                    )}

                                    <Image
                                        source={{uri: user.profilePic}}
                                        style={styles.image}
                                    />

                                    <Text style={styles.name} allowFontScaling={false}>{user.name}</Text>
                                </View>
                                <View>
                                    <Text style={styles.points} allowFontScaling={false}>
                                        {user.points} XP
                                    </Text>
                                </View>
                            </View>
                        );
                    })}

                {currentUserRankDetails && currentUserRankDetails.rank > 5 && (
                    <View style={[styles.belowTop5, styles.currentUser]}>
                        <View
                            style={{
                                flexDirection: 'row',
                                flex: 1,
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <Image
                                source={require('@/assets/images/growth.png')}
                                style={styles.growthImage}
                            />
                            <Text style={styles.rankBelowTop5}>
                                {currentUserRankDetails.rank}
                            </Text>
                            <Image
                                source={{
                                    uri: currentUserRankDetails.profilePic,
                                }}
                                style={styles.outsideTop5Image}
                            />
                            <Text style={styles.name}>
                                {currentUserRankDetails.name}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.points}>
                                {currentUserRankDetails.points} XP
                            </Text>
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
        color: Colors.light.color,
    },
    leaderboard: {
        padding: 20,
        marginTop: 10,
    },
    belowTop5: {
        marginTop: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 0.5,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    outsideTop5Image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    rank: {
        fontWeight: 'bold',
        color: Colors.default.purple500,
        width: 30,
        height: 30,
        textAlign: 'center',
        lineHeight: 30,
    },
    rankBelowTop5: {
        fontWeight: 'bold',
        marginRight: 20,
        color: Colors.default.purple500,
        marginLeft: 5,
    },
    rankImage: {
        width: 30,
        height: 30,
    },
    growthImage: {
        width: 15,
        height: 15,
    },
    name: {
        fontWeight: 'bold',
    },
    points: {
        fontWeight: 'thin',
    },
    image: {
        borderRadius: 20,
        width: 40,
        height: 40,
    },
    currentUser: {
        backgroundColor: Colors.overviewCard.background,
    },
});
