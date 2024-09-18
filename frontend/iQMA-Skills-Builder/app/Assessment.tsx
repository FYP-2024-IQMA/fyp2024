import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView, StyleSheet, Text, Image, View} from 'react-native';
import SectionCard from '@/components/SectionCard';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ProgressBar from '@/components/ProgressBar';
import {QuizCard} from '@/components/QuizCard';
import {router, useLocalSearchParams} from 'expo-router';
import {Question} from '@/constants/Quiz';
import * as unitEndpoints from '@/helpers/unitEndpoints';
import * as sectionEndpoints from '@/helpers/sectionEndpoints';
import * as quizEndpoints from '@/helpers/quizEndpoints';
import {formatUnit} from '@/helpers/formatUnitID';
import {formatSection} from '@/helpers/formatSectionID';
import {OverviewCard} from '@/components/OverviewCard';
import {LoadingIndicator} from '@/components/LoadingIndicator';

export default function Assessment() {
    const navigation = useNavigation();
    const [currentQnsIdx, setCurrentQnsIdx] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [unitNumber, setUnitNumber] = useState<string>('');
    const [unitName, setUnitName] = useState<string>('');
    const [sectionName, setSectionName] = useState<string>('');
    const [unitScenario, setUnitScenario] = useState<string>('');
    const [finalScenario, setFinalScenario] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
 

    // Hardcoded for now until routing confirmed
    const isFinal: boolean = true;
    const sectionID = 'SEC0001';
    const unitID = 'UNIT0001';

    useEffect(() => {
        if (isFinal) {
            (async () => {
                try {
                    const unitDetails = await unitEndpoints.getUnitDetails(
                        sectionID as string,
                        unitID as string
                    );
                    setUnitName(unitDetails.unitName);
                    setUnitScenario(unitDetails.scenario);

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
            if (isFinal) {
                router.replace('Home'); // Change Here
            } else {
                router.replace('Home'); // Change Here
            }
        }
    };

    return (
        <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            style={styles.container}
        >
            {isLoading ? (
                <LoadingIndicator />
            ) : (
                <>
                    <SectionCard
                        title={
                            isFinal
                                ? `SECTION ${sectionNumber}`
                                : `SECTION ${sectionNumber}, UNIT ${unitNumber}`
                        }
                        subtitle={isFinal ? `${sectionName}` : `${unitName}`}
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

                    {isFinal ? (
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
        backgroundColor: '#FFFFFF',
        padding: 20,
        flex: 1,
    },
});
