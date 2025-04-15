import { router } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Share,
  StyleSheet,
} from 'react-native';
import { Colors } from '@/constants/Colors';

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

const ProfileCard: React.FC<ProfileCardProps> = ({ userDetails }) => {
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'Join me on my iQMA Learning Adventure!',
      });

      if (result.action === Share.sharedAction) {
        console.log('Profile shared successfully');
      } else if (result.action === Share.dismissedAction) {
        console.log('Profile share dismissed');
      }
    } catch (error) {
      console.error('Error sharing profile:', error);
    }
  };

  const handleEditProfile = () => {
    router.push('EditProfile');
  };

  return (
    <View style={styles.profileCard}>
      <View style={styles.interactiveContainer}>
        <View style={styles.userProfileContainer}>
          <Text style={styles.name}>
            {userDetails.firstName + ' ' + userDetails.lastName}
          </Text>
          <Text style={styles.subText}>
            {'Joined ' + userDetails.dateCreated}
          </Text>
          <Text style={styles.subText}>
            {'Archetype: ' + userDetails.age}
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Pressable
            onPress={handleEditProfile}
            style={({ pressed }) => [
              styles.editButton,
              pressed && { transform: [{ scale: 0.96 }] }, // pressed in animation
            ]}
          >
            <Text style={styles.editText}>Edit Profile</Text>
          </Pressable>

          <Pressable
            onPress={handleShare}
            style={({ pressed }) => [
              styles.shareButton,
              pressed && { transform: [{ scale: 0.96 }] }, // pressed in animation
            ]}
          >
            <Image
              style={styles.shareIcon}
              source={require('@/assets/images/shareicon.png')}
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.mascotContainer}>
        <Image
          source={require('@/assets/images/wave1.png')}
          style={{}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#D1D5DB',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.background,
  },
  interactiveContainer: {
    padding: 10,
    justifyContent: 'center',
    flex: 1,
    gap: 20,
  },
  mascotContainer: {},
  userProfileContainer: {
    gap: 10,
  },
  name: {
    // color: '#4143A3',
    color: Colors.default.purple500,
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: '#9CA3AF',
    borderWidth: 1,
    backgroundColor: 'white',
    elevation: 5
  },
  editText: {
    fontSize: 12,
    // color: "#4143A3",
    color: Colors.default.purple500,
    fontWeight: 'bold',
  },
  shareButton: {
    justifyContent: 'center',
    padding: 8,
    borderRadius: 10,
    borderColor: '#9CA3AF',
    borderWidth: 1,
    backgroundColor: 'white',
    elevation: 5
  },
  shareIcon: {
    width: 24,
    height: 24,
  },
});

export default ProfileCard;
