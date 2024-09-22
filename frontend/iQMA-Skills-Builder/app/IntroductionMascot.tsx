import {StyleSheet, Image, View} from 'react-native';

import {ChatBubble} from '@/components/ChatBubble';
import {CustomButton} from '@/components/CustomButton';
import {router} from 'expo-router';

export default function LearnerAssessment() {
    const handlePress = () => {
        router.push('IntroductionSegment');
    };

    return (
        <View style={styles.container}>
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
