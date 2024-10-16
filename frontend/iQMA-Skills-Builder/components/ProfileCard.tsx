import { router } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity, Button, Share, StyleSheet } from 'react-native';
import {AuthContext} from '@/context/AuthContext';
import {useContext} from 'react';
import { LoadingIndicator } from './LoadingIndicator';

interface ProfileCardProps{
  userDetails: {
    age: String
    dateCreated : String,
    email : String,
    firstName: String,
    gender: String,
    hasOnboarder: boolean,
    lastName : String,
    role: String,
    userId: String

  }
}

const ProfileCard: React.FC<ProfileCardProps> = ({userDetails}) =>{
    const {currentUser} = useContext(AuthContext);
    if (!userDetails) {
      
        return <LoadingIndicator />;
    

    }
    
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'Join me on my iQMA Learning Adventure !',
        url: 'https://example.com/my-profile', // Add your profile URL here
        title: 'Yi Peng Tan Profile'
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
          console.log('Shared with activity type:', result.activityType);
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
        <View style ={styles.mainContainer}>
        <View  style={styles.textContainer}>
        <Text style={styles.name}>{userDetails.lastName + " " + userDetails.firstName}</Text>
        <Text style={styles.info}>{"Joined " + userDetails.dateCreated}</Text>
        <Text style={styles.info}>{"Archetype: " + userDetails.age}</Text>
        <View style ={styles.buttons}>
        <TouchableOpacity style={styles.editButton}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <Image
  source={require('../assets/images/Share.png')} 
  
style={styles.share}/>
          </TouchableOpacity>
          </View>
        </View>
        <View>
        <Image
  source={require('../assets/images/wave1.png')} 
  style={styles.avatar}
/>
</View>
</View>

        
        </View>
      
  
  );
};

const styles = StyleSheet.create({
    profileCard: {
      width: '100%', // Ensures the card takes up full width of the container
      backgroundColor: '#fff',
      borderRadius: 1,
      paddingTop:20,
      
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      borderBottomWidth: 2,  // Add a border only at the bottom
      borderColor: '#808080',   // Define the color of the bottom border
      paddingHorizontal: 20,
      paddingBottom:15,
      marginBottom:20, // Optional: Adjust padding as needed
    },
    textContainer:{
        
        paddingTop:10,
        marginLeft:40,
    

    

   

    },
    buttons:{
        marginTop: 10,
        flexDirection:"row"
    },
    mainContainer:{
        flexDirection:"row",

    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#4143A3',
      marginBottom: 10,
      
    },
    info: {
      fontSize: 14,
      color: '#777',
      marginBottom: 5,
    },
    avatar: {
      width: 86,
      height: 160,
      marginLeft:50
    
    
    },
    share:{
      height:24,
      width:24,

        

    },
    buttonContainer: {
      flexDirection: 'row',
      marginTop: 5,
    },
    editButton: {
      backgroundColor: '#fff',
      borderColor:'9CA3AF',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 2,
      borderWidth:1,
      paddingVertical:10,
      paddingHorizontal:30,
      borderRadius: 5,
      marginRight: 10,
      marginTop:5,
      elevation:5,
    
    },
    shareButton: {
      backgroundColor: '#fff',
      paddingHorizontal:5,
      paddingTop:4,
      borderRadius: 5,
      borderColor:'9CA3AF',
      borderWidth:1,
      elevation:5,
      height:40,
     marginTop:5,
    },
    buttonText: {
      color: '#5C5776',
      fontWeight: 'bold',
    },
  
  });
  

export default ProfileCard;
