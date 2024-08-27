import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { router } from 'expo-router';
import { Image, ProgressBarAndroid, View } from "react-native";
import { ChatBubble } from "@/components/ChatBubble";
import { CustomButton } from "@/components/CustomButton";

export default function LearnerAssessmentComplete() {
    const handlePress = async () => {
        const userID = await AsyncStorage.getItem('userID');

        const demographics =
        {
            "userID": userID,
            "race": await AsyncStorage.getItem('race'),
            "ethnicGroup": await AsyncStorage.getItem('ethnicGroup'),
            "jobCategory": await AsyncStorage.getItem('jobCategory'),
            "lifeStage": await AsyncStorage.getItem('lifeStage'),
            "careerStage": await AsyncStorage.getItem('careerStage'),
            "specialNeeds": await AsyncStorage.getItem('specialNeeds')
        }

        const cognitive = 
        {
            "userID": userID,
            "educationalLevel": await AsyncStorage.getItem('educationalLevel'),
            "languageAbilities": await AsyncStorage.getItem('languageAbilities'),
            "litNumProficiency": await AsyncStorage.getItem('litNumProficiency'),
            "learningPreferences": await AsyncStorage.getItem('learningPreferences'),
            "priorKnowledge": await AsyncStorage.getItem('priorKnowledge')
        }

        const dynamics = 
        {
            "userID": userID,
            "relationshipToPeers": await AsyncStorage.getItem('relationshipToPeers'),
            "tendency": await AsyncStorage.getItem('tendency'),
            "socialBackground": await AsyncStorage.getItem('socialBackground'),
            "compLiteracy": await AsyncStorage.getItem('compLiteracy')
        }

        const barrierArr = await AsyncStorage.getItem('barriers');
        const reasonArr = await AsyncStorage.getItem('reasons');

        const experience = 
        {
            "userID": userID,
            "attitude": await AsyncStorage.getItem('attitude'),
            "motivationalLevel": await AsyncStorage.getItem('motivationalLevel'),
            "barriers": JSON.parse(barrierArr!),
            "personality": await AsyncStorage.getItem('personality'),
            "reasons": JSON.parse(reasonArr!)
        }

        try {
            const [demographicsResponse, cognitiveResponse, dynamicsResponse, experienceResponse] = await Promise.all([
                await axios.post(`http://${process.env.EXPO_PUBLIC_LOCALHOST_URL}:3000/accountsdemographics/createaccountdemographics`, demographics),
                await axios.post(`http://${process.env.EXPO_PUBLIC_LOCALHOST_URL}:3000/accountscognitive/createaccountcognitive`, cognitive),
                await axios.post(`http://${process.env.EXPO_PUBLIC_LOCALHOST_URL}:3000/accountssocial/createaccountsocial`, dynamics),
                await axios.post(`http://${process.env.EXPO_PUBLIC_LOCALHOST_URL}:3000/accountsaffective/createaccountaffective`, experience)
            ]);

            const account = 
            {
                "userID": userID,
                "hasOnboarded": true
            };
            const accountResponse = await axios.patch(`http://${process.env.EXPO_PUBLIC_LOCALHOST_URL}:3000/accounts/updateaccount`, account);

            console.log("Account Demographics created successfully: ", demographicsResponse.data);
            console.log("Account Cognitive created successfully: ", cognitiveResponse.data);
            console.log("Account Social created successfully: ", dynamicsResponse.data);
            console.log("Account Affective created successfully: ", experienceResponse.data);
            console.log("Account has been updated", accountResponse);

            router.push("Home");
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <View style={{ 
            flex: 1, 
            justifyContent: "center",
            alignItems: "center", 
            backgroundColor: "#FFFFFF" 
        }}>

            <Image style={{marginBottom: 20}} source={require('@/assets/images/mascot.png')}></Image>
            <ChatBubble position='top'>Let’s have fun {"\n"}while learning!</ChatBubble>
            <View style={{
                position: 'absolute',
                bottom: 25,
            }}>
                <CustomButton label="continue" backgroundColor="white" onPressHandler={handlePress}/>
            </View>

        </View>
    )
}