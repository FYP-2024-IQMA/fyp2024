import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView, StyleSheet, Text, Image, View} from 'react-native';
import SectionCard from '@/components/SectionCard';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ProgressBar from '@/components/ProgressBar';
import {QuizCard} from '@/components/QuizCard';
import axios from 'axios';
import {router, useLocalSearchParams} from 'expo-router';
import {Question} from '@/constants/Quiz';
import {formatSection} from '@/helpers/formatSectionID';
import {formatUnit} from '@/helpers/formatUnitID';
import * as unitEndpoints from '@/helpers/unitEndpoints';
import * as lessonEndpoints from '@/helpers/lessonEndpoints';
import * as quizEndpoints from '@/helpers/quizEndpoints';
import * as resultEndpoints from '@/helpers/resultEndpoints';
import { AuthContext } from '@/context/AuthContext';
import {LoadingIndicator} from '@/components/LoadingIndicator';

export default function VideoQuiz() {
    const navigation = useNavigation();
    const {currentUser, isLoading} = useContext(AuthContext);
    const {sectionID, unitID, lessonID, currentLessonIdx, totalLesson, currentUnit, totalUnits} = useLocalSearchParams();
    const [currentQnsIdx, setCurrentQnsIdx] = useState(0);
    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [unitNumber, setUnitNumber] = useState<string>('');
    const [unitName, setUnitName] = useState<string>('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [lessonName, setLessonName] = useState<string>('');
    const [loading, setIsLoading] = useState<boolean>(true);
    const [nextLessonID, setnextLessonID] = useState<string>('');

    // const lessonName = "Lesson 1a: Understanding Verbal and Non-verbal Signals";
    // const sectionID = "SEC0001";
    // const unitID = "UNIT0001";
    // const lessonID = "1a";

    useEffect(() => {
        if (sectionID && unitID && lessonID) {
            (async () => {
                try {
                    const unitDetails = await unitEndpoints.getUnitDetails(
                        sectionID as string,
                        unitID as string
                    );

                    const lessonDetails = await lessonEndpoints.getLessonDetails(
                        sectionID as string,
                        unitID as string,
                        lessonID as string
                    );

                    const getAllLessons = await lessonEndpoints.getAllLesson(
                        sectionID as string,
                        unitID as string
                    );

                    let nxtLessonIdx = parseInt(currentLessonIdx as string) + 1;

                    if (nxtLessonIdx === parseInt(totalLesson as string)) {
                        setnextLessonID('LastLesson');
                    } else {
                        setnextLessonID(getAllLessons[nxtLessonIdx].lessonID);
                    }

                    const response = await quizEndpoints.getQuizzes(
                        sectionID as string,
                        unitID as string,
                        lessonID as string
                    );

                    setLessonName(lessonDetails.lessonName);
                    setUnitName(unitDetails.unitName);
                    setQuestions(response);
                    setSectionNumber(formatSection(sectionID as string));
                    setUnitNumber(formatUnit(unitID as string));
                } catch (error) {
                    console.error('Error fetching quiz data:', error);
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [sectionID, unitID, lessonID, nextLessonID]);

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
            try {
                const ifCompleted = await resultEndpoints.checkIfCompletedQuiz(currentUser.sub, questions[currentQnsIdx].quizID);

                if (!ifCompleted) {
                    await resultEndpoints.createResult(
                        currentUser.sub,
                        questions[currentQnsIdx].quizID
                    );
                }

                let pathName = 'KeyTakeaway';
                let currLessonID = lessonID;
                let currLessonIdx = parseInt(currentLessonIdx as string);

                console.log('nextLessonID:', nextLessonID);
                
                // if nextlessonID have "." then route back to Lesson page
                if (nextLessonID.includes('.')) {
                    pathName = 'Lesson';
                    currLessonID = nextLessonID;
                    currLessonIdx += 1;
                }

                router.push({
                    pathname: pathName,
                    params: {
                        sectionID,
                        unitID,
                        lessonID: currLessonID,
                        currentLessonIdx: currLessonIdx,
                        totalLesson,
                        currentUnit,
                        totalUnits,
                    },
                });
            } catch (e) {
                console.error('Error in Video Quiz', e);
            }
        }
    };

    return (
        <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            style={styles.container}
        >
            {loading ? (
                <LoadingIndicator />
            ) : (
                <>
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
                            Choose the most appropriate option for each
                            question.
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
                </>
            )}
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
