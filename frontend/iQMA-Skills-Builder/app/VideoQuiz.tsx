import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView, StyleSheet, Text, Image, View} from 'react-native';
import SectionCard from '@/components/SectionCard';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import ProgressBar from '@/components/ProgressBar';
import { QuizCard } from '@/components/QuizCard';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { Question } from '@/constants/Quiz';
import {formatSection} from '@/helpers/formatSectionID';
import {formatUnit} from '@/helpers/formatUnitID';
import * as unitEndpoints from '@/helpers/unitEndpoints';
import * as lessonEndpoints from '@/helpers/lessonEndpoints';
import * as quizEndpoints from '@/helpers/quizEndpoints';


export default function VideoQuiz() {
    const navigation = useNavigation();
    const {sectionID, unitID, lessonID} = useLocalSearchParams();
    const [currentQnsIdx, setCurrentQnsIdx] = useState(0);
    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [unitNumber, setUnitNumber] = useState<string>('');
    const [unitName, setUnitName] = useState<string>('');
    const [questions, setQuestions] = useState<Question[]>([]);;
    const [lessonName, setLessonName] = useState<string>('');
    
    // const lessonName = "Lesson 1a: Understanding Verbal and Non-verbal Signals";
    // const sectionID = "SEC0001";
    // const unitID = "UNIT0001";
    // const lessonID = "1a";

    useEffect(() => {
        if (sectionID && unitID && lessonID) {
            (async () => {
                const unitDetails = await unitEndpoints.getUnitDetails(
                    sectionID as string,
                    unitID as string
                );

                const lessonDetails = await lessonEndpoints.getLessonDetails(
                    sectionID as string,
                    unitID as string,
                    lessonID as string
                );

                const response = await quizEndpoints.getQuizzes(
                    sectionID as string,
                    unitID as string,
                    lessonID as string
                );

                setLessonName(lessonDetails.lessonName);
                setUnitName(unitDetails.unitName);
                setQuestions(response)
            })();
            setSectionNumber(formatSection(sectionID as string));
            setUnitNumber(formatUnit(unitID as string));
        }
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
            try {
                const resultResponse = await axios.post(
                    `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/result/createresult`,
                    {
                        "userID": await AsyncStorage.getItem('userID'),
                        "quizID": questions[currentQnsIdx].quizID
                    }
                )
                console.log(resultResponse.data)
                router.replace({
                    pathname: 'KeyTakeaway',
                    // params: {sectionID: sectionID, unitID: unitID, lessonID: '1a'},
                    params: {sectionID: sectionID, unitID: unitID,lessonID: lessonID},
                });
            } catch (e) {
                console.error(e);
            } 
            
        }
    };

    return (
        <ScrollView style={styles.container}>
            <SectionCard
                title={`SECTION ${sectionNumber}, UNIT ${unitNumber}`}
                subtitle={unitName}
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
                    <QuizCard
                        questionData={questions[currentQnsIdx]}
                        onNextQuestion={handleNextQuestion}
                    />
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
