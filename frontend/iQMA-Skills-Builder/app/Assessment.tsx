import * as quizEndpoints from '@/helpers/quizEndpoints';
import * as resultEndpoints from '@/helpers/resultEndpoints';
import * as sectionEndpoints from '@/helpers/sectionEndpoints';
import * as unitEndpoints from '@/helpers/unitEndpoints';

import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {router, useLocalSearchParams} from 'expo-router';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '@/context/AuthContext';
import {Colors} from '@/constants/Colors';
import {LoadingIndicator} from '@/components/LoadingIndicator';
import {OverviewCard} from '@/components/OverviewCard';
import ProgressBar from '@/components/ProgressBar';
import {Question} from '@/constants/Quiz';
import {QuizCard} from '@/components/QuizCard';
import SectionCard from '@/components/SectionCard';
import {formatSection} from '@/helpers/formatSectionID';
import {formatUnit} from '@/helpers/formatUnitID';
import {useNavigation} from '@react-navigation/native';

export default function Assessment() {
    const navigation = useNavigation();
    const {currentUser, isLoading} = useContext(AuthContext);
    const [currentQnsIdx, setCurrentQnsIdx] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [unitNumber, setUnitNumber] = useState<string>('');
    const [unitName, setUnitName] = useState<string>('');
    const [sectionName, setSectionName] = useState<string>('');
    const [unitScenario, setUnitScenario] = useState<string>('');
    const [loading, setIsLoading] = useState<boolean>(true);
    const {
        sectionID,
        unitID,
        currentUnit,
        totalUnits,
        isFinal,
        currentProgress,
        totalProgress,
    } = useLocalSearchParams();
    const [finalScenario, setFinalScenario] = useState<string>('');
    const [checkFinal, setCheckFinal] = useState<boolean>(false);

    // Hardcoded for now until routing confirmed
    // const isFinal: boolean = false;
    // const sectionID = 'SEC0001';
    // const unitID = 'UNIT0001';

    useEffect(() => {
        if (isFinal === 'true') {
            (async () => {
                try {
                    const sectionDetails =
                        await sectionEndpoints.getSectionDetails(
                            sectionID as string
                        );
                    setFinalScenario(sectionDetails.finalScenario);
                    setSectionName(sectionDetails.sectionName);

                    const assessmentQuestions =
                        await quizEndpoints.getFinalAssessmentQuestions(
                            sectionID as string
                        );
                    setQuestions(assessmentQuestions);
                    setCheckFinal(true);
                } catch (error) {
                    console.error(
                        'Error fetching final assessment details:',
                        error
                    );
                } finally {
                    setIsLoading(false);
                }
            })();
        } else {
            (async () => {
                try {
                    const unitDetails = await unitEndpoints.getUnitDetails(
                        sectionID as string,
                        unitID as string
                    );
                    setUnitName(unitDetails.unitName);
                    setUnitScenario(unitDetails.scenario);

                    const assessmentQuestions =
                        await quizEndpoints.getAssessmentQuestions(
                            sectionID as string,
                            unitID as string
                        );
                    setQuestions(assessmentQuestions);
                } catch (error) {
                    console.error('Error fetching assessment details:', error);
                } finally {
                    setIsLoading(false);
                }
            })();
        }
        setSectionNumber(formatSection(sectionID as string));
        setUnitNumber(formatUnit(unitID as string));
    }, [sectionID, unitID, checkFinal]);

    useLayoutEffect(() => {
        let progress = checkFinal
            ? 1
            : parseInt(currentProgress as string) /
              parseInt(totalProgress as string);

        navigation.setOptions({
            headerTitle: () => (
                <ProgressBar progress={progress} isQuestionnaire={false} />
            ),
        });
    }, [navigation, checkFinal]);

    const handleNextQuestion = async () => {
        const newIdx = currentQnsIdx + 1;
        if (newIdx < questions.length) {
            await AsyncStorage.setItem('currentQnsIdx', newIdx.toString());
            setCurrentQnsIdx(newIdx);
        } else {
            if (checkFinal) {
                // final assessment don't have self-reflection
                try {
                    const ifCompleted =
                        await resultEndpoints.checkIfCompletedQuiz(
                            currentUser.sub,
                            questions[currentQnsIdx].quizID
                        );

                    if (!ifCompleted) {
                        await resultEndpoints.createResult(
                            currentUser.sub,
                            questions[currentQnsIdx].quizID
                        );
                    }
                } catch (error) {
                    console.error('Error in Assessment:', error);
                }

                router.replace('Home');
            } else {
                router.push({
                    pathname: 'SelfReflection',
                    params: {
                        sectionID,
                        unitID,
                        currentUnit,
                        totalUnits,
                        quizID: questions[currentQnsIdx].quizID,
                        isFinal,
                        currentProgress,
                        totalProgress,
                    },
                });
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
                        title={
                            checkFinal
                                ? `SECTION ${sectionNumber}`
                                : `SECTION ${sectionNumber}, UNIT ${unitNumber}`
                        }
                        subtitle={checkFinal ? `${sectionName}` : `${unitName}`}
                    />
                    <View style={{marginHorizontal: 10}}>
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
                    </View>

                    {checkFinal ? (
                        <View>
                            <OverviewCard
                                isError={false}
                                text={finalScenario}
                                isScenario={true}
                                title="Scenario:"
                            />
                        </View>
                    ) : (
                        <View>
                            <OverviewCard
                                isError={false}
                                text={unitScenario}
                                isScenario={true}
                                title="Scenario:"
                            />
                        </View>
                    )}

                    {questions.length > 0 && questions[currentQnsIdx] && (
                        <QuizCard
                            questionData={questions[currentQnsIdx]}
                            onNextQuestion={handleNextQuestion}
                        />
                    )}
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.background,
        padding: 20,
        flex: 1,
    },
});
