import {Image, StyleSheet, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {ChatBubble} from '@/components/ChatBubble';
import {Colors} from '@/constants/Colors';
import {CustomButton} from '@/components/CustomButton';
import axios from 'axios';
import {router} from 'expo-router';
import * as accountEndpoints from '@/helpers/accountEndpoints';
import * as userStoneProgressEndpoints from '@/helpers/userStoneProgressEndpoints';

export default function FormComplete() {
    const handlePress = async () => {
        const userID = await AsyncStorage.getItem('userID');

        const aboutYou = {
            userID: userID,
            ageGroup: await AsyncStorage.getItem('ageGroup'),
            jobLevel: await AsyncStorage.getItem('jobLevel'),
            careerStage: await AsyncStorage.getItem('careerStage'),
        };

        const learningStylesArr = await AsyncStorage.getItem(
            'preferredLearningStyles'
        );

        const learningStyleAndSkills = {
            userID: userID,
            educationLevel: await AsyncStorage.getItem('educationLevel'),
            // preferredLearningStyles: await AsyncStorage.getItem('preferredLearningStyles'),
            preferredLearningStyles: JSON.parse(learningStylesArr!),
            currentSkillLevelInLeadership: await AsyncStorage.getItem(
                'currentSkillLevelInLeadership'
            ),
        };

        const socialAndTechHabits = {
            userID: userID,
            workStyle: await AsyncStorage.getItem('workStyle'),
            computerSkills: await AsyncStorage.getItem('computerSkills'),
        };

        const motivationsArr = await AsyncStorage.getItem('motivations');

        const motivation = {
            userID: userID,
            // motivations: await AsyncStorage.getItem('motivations'),
            motivations: JSON.parse(motivationsArr!),
            learningMotivation: await AsyncStorage.getItem(
                'learningMotivation'
            ),
        };

        try {
            const [
                aboutYouResponse,
                learningStyleAndSkillsResponse,
                socialAndTechHabitsResponse,
                motivationResponse,
            ] = await Promise.all([
                await axios.post(
                    `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accountsaboutyou/createaccountaboutyou`,
                    aboutYou
                ),
                await axios.post(
                    `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accountslearningstyleandskills/createaccountlearningstyleandskills`,
                    learningStyleAndSkills
                ),
                await axios.post(
                    `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accountssocialandtechhabits/createaccountsocialandtechhabits`,
                    socialAndTechHabits
                ),
                await axios.post(
                    `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accountsmotivation/createaccountmotivation`,
                    motivation
                ),
            ]);

            const account = {
                userID: userID!,
                age: aboutYou.ageGroup,
                hasOnboarded: true,
            };

            // set default user stone progress
            const userStoneProgress = {
                userID: userID!,
                last_completed_stone_index: -1,
                current_stone_index: 0,
                current_screen_index: 0,
                current_screen_pathname: "SectionIntroduction",
            };

            const accountResponse = await accountEndpoints.editUserDetails(
                account
            );

            const userStoneProgressResponse =
                await userStoneProgressEndpoints.createUserStoneProgress(
                    userStoneProgress
                );

            console.log(
                'About You created successfully: ',
                aboutYouResponse.data
            );
            console.log(
                'Learning Style and Skills created successfully: ',
                learningStyleAndSkillsResponse.data
            );
            console.log(
                'Social and Tech Habits created successfully: ',
                socialAndTechHabitsResponse.data
            );
            console.log(
                'Motivation created successfully: ',
                motivationResponse.data
            );
            console.log('Account has been updated', accountResponse);
            console.log('User stone progress created successfully: ', userStoneProgressResponse);

            router.push('/Home');
        } catch (e) {
            console.log('here');
            console.error(e);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.mascot}>
                <Image
                    style={styles.mascotImage}
                    source={require('@/assets/images/happyjump.png')}
                ></Image>
                <ChatBubble position="top" isUser={true}>
                    Let's have fun {'\n'}while learning!
                </ChatBubble>
            </View>

            <CustomButton
                label="continue"
                backgroundColor="white"
                onPressHandler={handlePress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.background,
        padding: 20,
        flex: 1,
    },
    mascot: {
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    },
    mascotImage: {
        marginBottom: 20,
    },
});
