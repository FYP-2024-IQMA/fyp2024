import { router } from 'expo-router';
import { Image, ProgressBarAndroid, View } from "react-native";
import { ChatBubble } from "@/components/ChatBubble";
import { CustomButton } from "@/components/CustomButton";

export default function LearnerAssessmentComplete() {
    const handlePress = () => {
        // TO-DO:
        // router.push("Home")
    };

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