import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { leaderboard } from '@/helpers/gamificationEndpoints';
import { globalStyles } from '@/constants/styles';
import goldImage from '@/assets/images/gold.png'; // Adjust the import path as needed
import silverImage from '@/assets/images/silver.png';
import bronzeImage from '@/assets/images/bronze.png';
import profileImage from '@/assets/images/Profile.png'; // Default profile picture
import growthImage from '@/assets/images/growth.png'

interface User {
    name: string;
    points: number; // Ensure points are a number
    rank: number;
}

interface LeaderboardData {
    top5: User[];
}
interface currentUserData{
    user: User,
}

export default function Leaderboard() {
    const { currentUser } = useContext(AuthContext);
    const [data, setData] = useState<LeaderboardData>({ top5: [] });
    const [loading, setLoading] = useState(true);
    const [currentUserData, setCurrentUserData] = useState<User>();
    
    

    const isTop5 = data.top5.some(user => user.name === currentUser.name);
    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const response = await leaderboard(currentUser.sub);
                setData(response); 
                if (Object.keys(response.user).length === 0) {
                    // If response.user is an empty object
                    setCurrentUserData({
                        "rank": 6,
                        "name": "fadhli 6",
                        "points": 20
                    });
                } else {
                    // If response.user has data
                    setCurrentUserData(response.user);
                }
                console.log(currentUserData)
            } catch (error) {
                console.log(error); // Handle any errors
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchLeaderboardData();
    }, [currentUser]);

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <ScrollView style={globalStyles.container}>
            <View style={styles.leaderboard}>
                {data.top5.map((user) => {
                    const isCurrentUser = user.name === currentUser.name; // Check if the user is the current user
                    return (
                        <View
                            key={user.rank}
                            style={[
                                styles.itemContainer,
                                isCurrentUser && styles.currentUser // Apply overlay styles if it's the current user
                            ]}
                        >
                            {user.rank === 1 ? (
                                <Image source={goldImage} style={styles.rankImage} />
                            ) : user.rank === 2 ? (
                                <Image source={silverImage} style={styles.rankImage} />
                            ) : user.rank === 3 ? (
                                <Image source={bronzeImage} style={styles.rankImage} />
                            ) : (
                                <Text style={styles.rank}>{user.rank}</Text>
                            )}
                            {/* Conditional rendering for profile picture */}
                            {user.name !== currentUser.name ? (
                                <Image source={profileImage} style={styles.image} />
                            ) : (
                                <Image source={{ uri: currentUser.picture }} style={styles.profileImage} />
                            )}
                            <Text style={styles.name}>{user.name}</Text>
                            <Text style={styles.points}>{user.points} XP</Text>
                        </View>
                    );
                })}
               { !isTop5 && (
                <View style={[styles.belowTop5,styles.currentUser]}>
             <Image source={growthImage} style={styles.growthImage} />
            <Text style={styles.rankBelowTop5}>{currentUserData?.rank}</Text>
            <Image source={{ uri: currentUser.picture }} style={styles.outsideTop5Image} />
            <Text style={styles.name}>{currentUserData?.name}</Text>    
            <Text style={styles.points}>{currentUserData?.points} XP</Text>


                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    leaderboard: {
        padding: 20,
        marginTop: 50,

    },
    belowTop5:{
        marginTop:10,
        paddingTop:10,
        flexDirection: 'row',
        alignItems: 'center', // Align items vertically centered
        justifyContent: 'space-between',
        borderTopWidth:0.5,
      
       

        

    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center', // Align items vertically centered
        justifyContent: 'space-between',
        padding: 10,
        
    },
    outsideTop5Image: {
        width:40, // Adjust size as needed
        height: 40, // Adjust size as needed
        borderRadius: 27.5, // Make the image circular
        // Optional: add a border // Optional: border color
        marginRight:10,
    },
  
    rank: {
        fontWeight: 'bold',
        marginRight: 20,
        color: '#7654F2',
        marginLeft: 10,
    },
    rankBelowTop5 :{
        fontWeight: 'bold',
        marginRight: 20,
        color: '#7654F2',
        marginLeft: 5,

    },
    rankImage: {
        width: 30, // Adjust size as needed
        height: 30, // Adjust size as needed
        marginRight: 10,
    },
    growthImage:{
        width:15,
        height:15,
    },

    name: {
        flex: 1,
        fontWeight: 'bold',
    },
    points: {
        fontWeight: 'thin',
    },
    image: {
        width: 40, // Adjust size as needed
        height: 40, // Adjust size as needed
        marginRight: 10, // Space between the image and text
    },
    currentUser: {
        backgroundColor: '#EAF1FF', // Purple overlay with some transparency
        
        // Optional: border color to highlight the current user
    },
});
