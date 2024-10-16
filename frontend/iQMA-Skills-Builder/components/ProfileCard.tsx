import {router} from 'expo-router';
import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Button,
    Share,
    StyleSheet,
} from 'react-native';
import {AuthContext} from '@/context/AuthContext';
import {useContext} from 'react';
import {LoadingIndicator} from './LoadingIndicator';

interface ProfileCardProps {
    userDetails: {
        age: String;
        dateCreated: String;
        email: String;
        firstName: String;
        gender: String;
        hasOnboarder: boolean;
        lastName: String;
        role: String;
        userId: String;
    };
}

const ProfileCard: React.FC<ProfileCardProps> = ({userDetails}) => {

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: 'Join me on my iQMA Learning Adventure!',
                url: 'https://example.com/my-profile', // Add your profile URL here
                title: 'Yi Peng Tan Profile',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // Shared with activity type of result.activityType
                    console.log(
                        'Shared with activity type:',
                        result.activityType
                    );
                } else {
                    // Shared successfully
                    console.log('Profile shared successfully');
                }
            } else if (result.action === Share.dismissedAction) {
                // Dismissed without sharing
                console.log('Profile share dismissed');
            }
        } catch (error) {
            console.error('Error sharing profile:', error);
        }
    };

    return (
        <View style={styles.profileCard}>
            <View style={styles.innerContainer}>
                <View
                    style={styles.interactiveContainer}
                >
                    <View style={styles.userProfileContainer}>
                        <Text style={styles.name}>
                            {userDetails.lastName + ' ' + userDetails.firstName}
                        </Text>
                        <Text style={styles.subText}>
                            {'Joined ' + userDetails.dateCreated}
                        </Text>
                        <Text style={styles.subText}>
                            {'Archetype: ' + userDetails.age}
                        </Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.editButton}>
                            <Text style={styles.editText}>Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                            <Image
                                style={styles.shareIcon}
                                source={require('@/assets/images/shareicon.png')}
                            ></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.mascotContainer}>
                <Image
                    style={{}}
                    source={require('@/assets/images/wave1.png')}
                ></Image>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    profileCard: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#D1D5DB',
    },
    innerContainer: {
        flex: 3,
    },
    interactiveContainer: {
      // backgroundColor: 'green',
      padding: 10,
      justifyContent: 'center',
      flex: 1,
      gap: 20,
    },
    mascotContainer: {
      flex: 1
    },
    userProfileContainer: {
        gap: 10,
    },
    name: {
        color: '#4143A3',
        fontWeight: 'bold',
        fontSize: 20,
    },
    subText: {
        color: '#5C5776',
        fontSize: 12,
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    editButton: {
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        borderColor: '#9CA3AF',
        borderWidth: 1,
    },
    editText: {
        fontSize: 12,
    },
    shareButton: {
        justifyContent: 'center',
        padding: 5,
        borderRadius: 10,
        borderColor: '#9CA3AF',
        borderWidth: 1,
    },
    shareIcon: {
        width: 24,
        height: 24,
    },
});

export default ProfileCard;
