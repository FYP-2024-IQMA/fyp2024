import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView, StyleSheet, Text, Image, View} from 'react-native';
import SectionCard from '@/components/SectionCard';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ProgressBar from '@/components/ProgressBar';
import {QuizCard} from '@/components/QuizCard';
import {router, useLocalSearchParams} from 'expo-router';
import {Question} from '@/constants/Quiz';
import * as unitEndpoints from '@/helpers/unitEndpoints';
import * as assessmentEndpoints from '@/helpers/assessmentEndpoints';
import {formatUnit} from '@/helpers/formatUnitID';
import {formatSection} from '@/helpers/formatSectionID';
import {OverviewCard} from '@/components/OverviewCard';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import * as resultEndpoints from '@/helpers/resultEndpoints';
import {AuthContext} from '@/context/AuthContext';

export default function Assessment() {
    const navigation = useNavigation();
    const {currentUser, isLoading} = useContext(AuthContext);
    const [currentQnsIdx, setCurrentQnsIdx] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [unitNumber, setUnitNumber] = useState<string>('');
    const [unitName, setUnitName] = useState<string>('');
    const [unitScenario, setUnitScenario] = useState<string>('');
    const [loading, setIsLoading] = useState<boolean>(true);
    const {sectionID, unitID, currentUnit, totalUnits, isFinal} = useLocalSearchParams();

    useEffect(() => {
        if (sectionID && unitID) {
            (async () => {
                try {
                    const unitDetails = await unitEndpoints.getUnitDetails(
                        sectionID as string,
                        unitID as string
                    );
                    setUnitName(unitDetails.unitName);
                    setUnitScenario(unitDetails.scenario);

                    const assessmentQuestions =
                        await assessmentEndpoints.getAssessmentQuestions(
                            sectionID as string,
                            unitID as string
                        );
                    setQuestions(assessmentQuestions);

                    setSectionNumber(formatSection(sectionID as string));
                    setUnitNumber(formatUnit(unitID as string));
                } catch (error) {
                    console.error('Error fetching unit details', error);
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [sectionID, unitID]);

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

            if (isFinal === 'true') {
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
                        isFinal
                    }
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
                        title={`SECTION ${sectionNumber}, UNIT ${unitNumber}`}
                        subtitle={unitName}
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
                    <View>
                        <OverviewCard
                            isError={false}
                            text={unitScenario}
                            isScenario={true}
                            title="Scenario:"
                        />
                    </View>

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
        backgroundColor: '#FFFFFF',
        padding: 20,
        flex: 1,
    },
});
