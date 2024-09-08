import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView, StyleSheet, Text, Image, View} from 'react-native';
import SectionCard from '@/components/SectionCard';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import ProgressBar from '@/components/ProgressBar';
import { QuizCard } from '@/components/QuizCard';
import axios from 'axios';
import { router } from 'expo-router';
import { Question } from '@/constants/Quiz';

export default function VideoQuiz() {
    const navigation = useNavigation();
    const [currentQnsIdx, setCurrentQnsIdx] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);;
    
    const lessonName = "Lesson 1a: Understanding Verbal and Non-verbal Signals";
    const sectionID = "SEC0001";
    const unitID = "UNIT0001";
    const lessonID = "1a";

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(
                    `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/quiz/getquestions/${sectionID}/${unitID}/${lessonID}`
                );
                setQuestions(response.data)
            } catch (e) {
                console.error(e);
            }
        };
        fetchQuestions();
    }, [sectionID, unitID, lessonID]);

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
        }
        else {
            // TO CHANGE:
            router.replace("SectionIntroduction");
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
                {questions.length > 0 && questions[currentQnsIdx] && (
                    <QuizCard questionData={questions[currentQnsIdx]} onNextQuestion={handleNextQuestion} />
                )}
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
