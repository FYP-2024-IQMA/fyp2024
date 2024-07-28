import { router } from 'expo-router';
import { Image, View } from "react-native";
import { ChatBubble } from "@/components/ChatBubble";
import { CustomButton } from "@/components/CustomButton";

export default function LearnerAssessment() {
    const handlePress = () => {
        router.push("IntroductionSegment")
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
            <ChatBubble position='top'>Hi there! I'm Dao!</ChatBubble>
            <View style={{
                position: 'absolute',
                bottom: 40,
            }}>
                <CustomButton label="continue" backgroundColor="white" onPressHandler={handlePress}/>
            </View>
        </View>
    );
}