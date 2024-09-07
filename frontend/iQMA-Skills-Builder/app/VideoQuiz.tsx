import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView, StyleSheet, Text, Image, View} from 'react-native';
import SectionCard from '@/components/SectionCard';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ProgressBar from '@/components/ProgressBar';
import {QuizCard} from '@/components/QuizCard';
import {router} from 'expo-router';

export default function VideoQuiz() {
    const navigation = useNavigation();
    const [currentQnsIdx, setCurrentQnsIdx] = useState(0);

    const lessonName = 'Lesson 1a: Understanding Verbal and Non-verbal Signals';

    const questions = [
        {
            quizID: 1,
            questionNo: 1,
            question:
                'Which aspect of communication is most crucial in environments requiring explicit clarity and detail?',
            option1: {
                option: 'Non-verbal cues',
                explanation:
                    'Incorrect. Non-verbal cues are important but do not provide explicit clarity and detail. They can enhance communication but are not sufficient for providing detailed explanations.',
            },
            option2: {
                option: 'Written documentation',
                explanation:
                    'Incorrect. Written documentation is important for clarity but the question emphasizes the role of verbal explanations in dynamic interactions. Written documentation is static and does not allow for immediate clarification or interaction.',
            },
            option3: {
                option: 'Verbal explanations',
                explanation:
                    'Correct. Verbal explanations are essential in scenarios like negotiations, where explicit clarity and detail are critical. They allow for immediate feedback, questions, and clarification.',
            },
            option4: {
                option: 'Visual aids',
                explanation:
                    'Incorrect. Visual aids support communication but are not sufficient alone for providing detailed explanations. They enhance verbal communication but cannot replace the need for clear verbal explanations.',
            },
            answer: 'option3',
            isSelfReflection: false,
        },
        {
            quizID: 1,
            questionNo: 2,
            question:
                'In which scenario might non-verbal communication play a more significant role than verbal communication?',
            option1: {
                option: 'Negotiating a contract',
                explanation:
                    'Incorrect. Negotiating a contract relies heavily on clear verbal communication. Although non-verbal cues can be important, the primary mode of communication is verbal.',
            },
            option2: {
                option: 'Delivering a technical presentation',
                explanation:
                    'Incorrect. Delivering a technical presentation typically relies on clear verbal and visual communication. Verbal communication is essential for explaining technical details.',
            },
            option3: {
                option: 'Comforting a colleague in distress',
                explanation:
                    'Correct. Non-verbal communication, such as gestures and facial expressions, plays a significant role in comforting someone. Physical presence, touch, and facial expressions can convey empathy and support more effectively than words.',
            },
            option4: {
                option: 'Writing an email to a client',
                explanation:
                    'Incorrect. Writing an email is a form of written communication. Non-verbal communication does not play a role in written emails, where the communication is text-based.',
            },
            answer: 'option3',
            isSelfReflection: false,
        },
    ];

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <ProgressBar progress={0.3} isQuestionnaire={false} />
            ),
        });
    }, [navigation]);

    const handleNextQuestion = async () => {
        const newIdx = currentQnsIdx + 1;
        if (newIdx < questions.length) {
            await AsyncStorage.setItem('currentQnsIdx', newIdx.toString());
            setCurrentQnsIdx(newIdx);
        } else {
            router.replace('SectionIntroduction');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <SectionCard
                title="SECTION 1, UNIT 1"
                subtitle="Foundations of Communication"
            />
            <View style={{marginHorizontal: 10}}>
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#4143A3',
                    }}
                >
                    {lessonName}
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        color: '#4143A3',
                        marginBottom: 10,
                    }}
                >
                    Choose the most appropriate option for each question.
                </Text>
                <View style={{alignItems: 'center'}}>
                    <Image
                        style={{marginBottom: 10}}
                        source={require('@/assets/images/deepinthought.png')}
                    />
                </View>
                <QuizCard
                    questionData={questions[currentQnsIdx]}
                    onNextQuestion={handleNextQuestion}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        flex: 1,
    },
});
