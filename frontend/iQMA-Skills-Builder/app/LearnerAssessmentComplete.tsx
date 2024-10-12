import {StyleSheet, Image, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {ChatBubble} from '@/components/ChatBubble';
import {CustomButton} from '@/components/CustomButton';
import axios from 'axios';
import {router} from 'expo-router';
import * as accountEndpoints from '@/helpers/accountEndpoints';

export default function LearnerAssessmentComplete() {
    const handlePress = async () => {
        const userID = await AsyncStorage.getItem('userID');

        const demographics = {
            userID: userID,
            race: await AsyncStorage.getItem('race'),
            ethnicGroup: await AsyncStorage.getItem('ethnicGroup'),
            jobCategory: await AsyncStorage.getItem('jobCategory'),
            lifeStage: await AsyncStorage.getItem('lifeStage'),
            careerStage: await AsyncStorage.getItem('careerStage'),
            specialNeeds: await AsyncStorage.getItem('specialNeeds'),
        };

        const cognitive = {
            userID: userID,
            educationalLevel: await AsyncStorage.getItem('educationalLevel'),
            languageAbilities: await AsyncStorage.getItem('languageAbilities'),
            litNumProficiency: await AsyncStorage.getItem('litNumProficiency'),
            learningPreferences: await AsyncStorage.getItem(
                'learningPreferences'
            ),
            priorKnowledge: await AsyncStorage.getItem('priorKnowledge'),
        };

        const dynamics = {
            userID: userID,
            relationshipToPeers: await AsyncStorage.getItem(
                'relationshipToPeers'
            ),
            tendency: await AsyncStorage.getItem('tendency'),
            socialBackground: await AsyncStorage.getItem('socialBackground'),
            compLiteracy: await AsyncStorage.getItem('compLiteracy'),
        };

        const barrierArr = await AsyncStorage.getItem('barriers');
        const reasonArr = await AsyncStorage.getItem('reasons');

        const experience = {
            userID: userID,
            attitude: await AsyncStorage.getItem('attitude'),
            motivationalLevel: await AsyncStorage.getItem('motivationalLevel'),
            barriers: JSON.parse(barrierArr!),
            personality: await AsyncStorage.getItem('personality'),
            reasons: JSON.parse(reasonArr!),
        };

        try {
            const [
                demographicsResponse,
                cognitiveResponse,
                dynamicsResponse,
                experienceResponse,
            ] = await Promise.all([
                await axios.post(
                    `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accountsdemographics/createaccountdemographics`,
                    demographics
                ),
                await axios.post(
                    `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accountscognitive/createaccountcognitive`,
                    cognitive
                ),
                await axios.post(
                    `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accountssocial/createaccountsocial`,
                    dynamics
                ),
                await axios.post(
                    `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accountsaffective/createaccountaffective`,
                    experience
                ),
            ]);

            const account = {
                userID: userID!,
                hasOnboarded: true,
            };

            const accountResponse = await accountEndpoints.editUserDetails(account);

            // const accountResponse = await axios.patch(
            //     `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accounts/updateaccount`,
            //     account
            // );

            console.log(
                'Account Demographics created successfully: ',
                demographicsResponse.data
            );
            console.log(
                'Account Cognitive created successfully: ',
                cognitiveResponse.data
            );
            console.log(
                'Account Social created successfully: ',
                dynamicsResponse.data
            );
            console.log(
                'Account Affective created successfully: ',
                experienceResponse.data
            );
            console.log('Account has been updated', accountResponse);

            router.push('Home');
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
        backgroundColor: '#FFFFFF',
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
