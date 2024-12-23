import * as chatInteractionsEndpoints from '@/helpers/chatInteractions';
import * as gamificationEndpoints from '@/helpers/gamificationEndpoints';
import * as resultEndpoints from '@/helpers/resultEndpoints';
import * as unitEndpoints from '@/helpers/unitEndpoints';

import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {router, useLocalSearchParams} from 'expo-router';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '@/context/AuthContext';
import {Colors} from '@/constants/Colors';
import {CustomButton} from '@/components/CustomButton';
import {Ionicons} from '@expo/vector-icons';
import {LoadingIndicator} from '@/components/LoadingIndicator';
import MiniChatbot from '@/components/MiniChatbot';
import ProgressBar from '@/components/ProgressBar';
import SectionCard from '@/components/SectionCard';
import {formatSection} from '@/helpers/formatSectionID';
import {formatUnit} from '@/helpers/formatUnitID';
import {useNavigation} from '@react-navigation/native';
import {useTimer} from '@/helpers/useTimer';

export default function SelfReflection() {
    const navigation = useNavigation();
    const {currentUser} = useContext(AuthContext);
    const {
        sectionID,
        unitID,
        currentUnit,
        totalUnits,
        quizID,
        currentProgress,
        totalProgress,
    } = useLocalSearchParams();

    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [unitName, setUnitName] = useState<string>('');
    const [unitNumber, setUnitNumber] = useState<string>('');
    const [chatHistoryLength, setChatHistoryLength] = useState<number>(0);
    const handleChatHistoryUpdate = (length: number) => {
        setChatHistoryLength(length);
    };
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {startTimer, stopTimer} = useTimer(
        sectionID as string,
        'Self Reflection',
        unitID as string
    );

    useLayoutEffect(() => {
        const progress =
            parseInt(currentProgress as string) /
            parseInt(totalProgress as string);

        navigation.setOptions({
            headerTitleAlign: 'center',
            headerTitle: () => (
                <ProgressBar progress={progress} isQuestionnaire={false} />
            ),
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {
                        router.replace('Home');
                    }}
                >
                    <Ionicons name="home" size={24} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        startTimer();
        if (sectionID && unitID) {
            (async () => {
                try {
                    console.log({
                        sectionID,
                        unitID,
                        currentUnit,
                        totalUnits,
                        isFinal: 'true',
                        currentProgress: (
                            parseInt(currentProgress as string) + 1
                        ).toString(),
                        totalProgress,
                    });
                    const unitDetails = await unitEndpoints.getUnitDetails(
                        sectionID as string,
                        unitID as string
                    );

                    setUnitName(unitDetails.unitName);
                    setSectionNumber(formatSection(sectionID as string));
                    setUnitNumber(formatUnit(unitID as string));
                } catch (error) {
                    console.error(
                        'Error fetching unitDetails in Self-Reflection',
                        error
                    );
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [sectionID, unitID]);

    const handlePress = async () => {
        try {
            const ifCompleted = await resultEndpoints.checkIfCompletedQuiz(
                currentUser.sub,
                parseInt(quizID as string)
            );

            // add number of interactions to clickstream
            const numberOfInteractions = (chatHistoryLength - 1) / 2;
            await chatInteractionsEndpoints.chatInteractions(
                sectionID as string,
                unitID as string,
                numberOfInteractions
            );

            if (!ifCompleted) {

                let points = await AsyncStorage.getItem('totalPoints');
                const numPoints = parseInt(points as string);

                await gamificationEndpoints.updatePoints(
                    currentUser.sub,
                    numPoints
                );

                await gamificationEndpoints.updateStreakUnit(currentUser.sub, quizID as string);

                router.push({
                    pathname: 'Badge',
                    params: {
                        sectionID,
                        unitID,
                        currentUnit,
                        totalUnits,
                        currentProgress: (
                            parseInt(currentProgress as string)
                        ).toString(),
                        totalProgress,
                    },
                });

            } else {

                if (parseInt(unitNumber) === parseInt(totalUnits as string)) {
                    // if last unit, go back to Assessment Intro for Final Assessment (AssessmentIntroduction.tsx)
                    router.push({
                        pathname: 'AssessmentIntroduction',
                        params: {
                            sectionID,
                            unitID,
                            currentUnit,
                            totalUnits,
                            isFinal: 'true',
                            currentProgress: (
                                parseInt(currentProgress as string) + 1
                            ).toString(),
                            totalProgress,
                        },
                    });
                } else {
                    // after self-reflection navigate back to home for next unit
                    router.replace('Home');
                }

            }

        } catch (error) {
            console.error(
                'Error in Submitting Unit Assessment (Self-Reflection Page):',
                error
            );
        }
        stopTimer();
    };

    return (
        <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            style={styles.container}
            scrollEnabled={false}
        >
            {isLoading ? (
                <LoadingIndicator />
            ) : (
                <>
                    <ScrollView>
                        <SectionCard
                            title={`SECTION ${sectionNumber}, UNIT ${unitNumber}`}
                            subtitle={unitName}
                        />
                        <Text style={styles.screenTitle}>Self Reflection</Text>
                        <Text
                            style={{
                                fontSize: 11,
                                color: Colors.header.color,
                                marginBottom: 20,
                                marginHorizontal: 10,
                            }}
                        >
                            Use a few words to share your thoughts on the
                            following question.
                        </Text>
                        <MiniChatbot
                            onChatHistoryUpdate={handleChatHistoryUpdate}
                            sectionID={sectionID as string}
                            unitID={unitID as string}
                        />
                    </ScrollView>
                    <CustomButton
                        label="continue"
                        backgroundColor="white"
                        onPressHandler={handlePress}
                        disabled={chatHistoryLength < 3}
                    />
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
    screenTitle: {
        fontSize: Colors.lessonName.fontSize,
        fontWeight: 'bold',
        color: Colors.header.color,
        marginBottom: 20,
        marginHorizontal: 10,
    },
});
