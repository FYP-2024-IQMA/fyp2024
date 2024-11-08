import {Image, ScrollView, StyleSheet, View} from 'react-native';

import {ChatBubble} from '@/components/ChatBubble';
import {Colors} from '@/constants/Colors';
import {CustomButton} from '@/components/CustomButton';
import {router} from 'expo-router';

export default function LearnerAssessment() {
    const handlePress = () => {
        router.push('IntroductionSegment');
    };

    return (
        <ScrollView 
        // style={styles.container}
        contentContainerStyle={{
            flexGrow: 1,
            padding: 20,
            backgroundColor: Colors.light.background
        }}>
            <View style={styles.mascot}>
                <Image
                    style={styles.mascotImage}
                    source={require('@/assets/images/handsinpocket2.png')}
                ></Image>
                <ChatBubble position="top" isUser={true}>
                    Hi there! I'm Dao!
                </ChatBubble>
            </View>
            <CustomButton
                label="continue"
                backgroundColor="white"
                onPressHandler={handlePress}
            />
        </ScrollView>
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
