import { router } from 'expo-router';
import { Image, View, Text } from "react-native";
import { ChatBubble } from "@/components/ChatBubble";
import { CustomButton } from "@/components/CustomButton";

export default function IntroductionSegment() {
    const handlePress = () => {
        router.push("LearnerAssessmentDemographics")
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Image style={{marginBottom: 20}} source={require('@/assets/images/mascot.png')}></Image>
            <ChatBubble position='top'>
                Help me understand you better with just{'\n'}<Text style={{ fontWeight: 'bold' }}>4 quick segments</Text>!
            </ChatBubble>
            <View style={{
                position: 'absolute',
                bottom: 25,
            }}>
                <CustomButton label="continue" backgroundColor="white" onPressHandler={handlePress}/>
            </View>
        </View>
    )
}