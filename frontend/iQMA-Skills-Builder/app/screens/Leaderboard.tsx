import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '@/context/AuthContext';
import {LoadingIndicator} from '@/components/LoadingIndicator';
import {getLeaderboard} from '@/helpers/gamificationEndpoints';
import {globalStyles} from '@/constants/styles';
import {Colors} from '@/constants/Colors';

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

    const mockData = {
        user: {
            rank: 6,
            name: 'newemail new',
            points: 0,
            profilePic:
                'https://s.gravatar.com/avatar/9729153ddfd681496bc6c0ca73cff1f6?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fne.png',
        },
        top5: [
            {
                rank: 1,
                name: 'r sng',
                points: 1000,
                profilePic:
                    'https://lh3.googleusercontent.com/a/ACg8ocKaRQKG30OsaOP70Iy_NOSwNAI_T6gnteL0HmW5UsDzOT6KHA=s96-c',
            },
            {
                rank: 2,
                name: 'Kb A',
                points: 450,
                profilePic:
                    'https://lh3.googleusercontent.com/a/ACg8ocIM92iV75eTcPwAbJlvOK5uYb0Oq_86UwCnd_STHRoRPeR3M9E=s96-c',
            },
            {
                rank: 3,
                name: 'fadhli tan',
                points: 275,
                profilePic:
                    'https://lh3.googleusercontent.com/a/ACg8ocLg8qSMH09DEWPw9_UMVAsnK7CNU8wAz_Oi1YIwgtMapVsgXQ=s96-c',
            },
            {
                rank: 4,
                name: 'Germaine Lim',
                points: 185,
                profilePic:
                    'https://lh3.googleusercontent.com/a/ACg8ocJyaci71qFm4fKapaip-STm9ObiuI9v1N6cUJ6r26pMtREBBA=s96-c',
            },
            {
                rank: 5,
                name: 'yp tan',
                points: 10,
                profilePic:
                    'https://lh3.googleusercontent.com/a/ACg8ocL9ZfGONHmi1bv88EiOilxaa3uU1eB3g9FhOXTYj0GhDQuV_A=s96-c',
            },
        ],
    };

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const response = await getLeaderboard(currentUser.sub);
                setCurrentUserRankDetails(response.user);
                setLeaderboard(response.top5);
                // setCurrentUserRankDetails(mockData.user);
                // setLeaderboard(mockData.top5);
                console.log(response);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboardData();
    }, []);

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <ScrollView style={globalStyles.container}>
            <View style={styles.leaderboard}>
                <View style={{alignItems: 'center'}}>
                    <Text
                        style={styles.title}
                    >
                        Top 5 Learners
                    </Text>
                </View>
                {leaderboard &&
                    leaderboard.map((user: User) => {
                        return (
                            <View
                                key={user.rank}
                                style={[
                                    styles.itemContainer,
                                    currentUserRankDetails?.rank ===
                                        user.rank && styles.currentUser,
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
                                            <Text style={styles.rank}>
                                                {user.rank}
                                            </Text>
                                        </View>
                                    )}

                                    <Image
                                        source={{uri: user.profilePic}}
                                        style={styles.image}
                                    />

                                    <Text style={styles.name}>{user.name}</Text>
                                </View>
                                <View>
                                    <Text style={styles.points}>
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
