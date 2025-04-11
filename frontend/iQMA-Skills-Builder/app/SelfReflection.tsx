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
import * as userStoneProgressEndpoints from '@/helpers/userStoneProgressEndpoints';
import {useUpdateUserScreenProgress} from '@/hooks/useUpdateUserScreenProgress';


export default function SelfReflection() {
    const navigation = useNavigation();
    const {currentUser} = useContext(AuthContext);
    const {
        sectionID,
        unitID,
        lessonID,
        isFinal,
        stoneIndex,
        screenIndex,
        totalScreens,
        quizID,
        inProgress
    } = useLocalSearchParams();

    useUpdateUserScreenProgress({
                stoneIndex: Number(stoneIndex),
                screenIndex: Number(screenIndex),
                screenPathname: 'SelfReflection',
                inProgress: inProgress === 'true',
            });
    

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
        // const progress =
        //     parseInt(currentProgress as string) /
        //     parseInt(totalProgress as string);

        const progress =
            (Number(screenIndex) + 1 || 1) / (Number(totalScreens) || 1);

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
                        lessonID,
                        isFinal,
                        stoneIndex,
                        screenIndex: (Number(screenIndex) + 1).toString(), // increment by 1 screen
                        totalScreens,
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

            console.log('QUIZ ID ', quizID);

            // add number of interactions to clickstream
            const numberOfInteractions = (chatHistoryLength - 1) / 2;
            await chatInteractionsEndpoints.chatInteractions(
                sectionID as string,
                unitID as string,
                numberOfInteractions
            );

            let points = await AsyncStorage.getItem('totalPoints');
            const numPoints = parseInt(points as string);

            await gamificationEndpoints.updatePoints(
                currentUser.sub,
                numPoints
            );

            // await gamificationEndpoints.updateStreakUnit(
            //     currentUser.sub,
            //     quizID as string
            // );

            const userStoneProgress = {
                userID: currentUser.sub,
                last_completed_stone_index: parseInt(stoneIndex as string),
                current_stone_index: parseInt(stoneIndex as string) + 1,
                current_screen_index: 0,
                current_screen_pathname: null,
            };

            const updateUserStoneProgress =
                await userStoneProgressEndpoints.updateUserStoneProgress(
                    userStoneProgress
                );

            console.log(
                'User stone progress updated successfully: ',
                updateUserStoneProgress
            );

            router.push({
                pathname: 'Badge',
                params: {
                    sectionID,
                    unitID,
                    lessonID,
                    isFinal,
                    stoneIndex,
                    screenIndex: (Number(screenIndex) + 1).toString(), // increment by 1 screen
                    totalScreens,
                },
            });
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
            // contentContainerStyle={{flexGrow: 1}}
            // style={styles.container}
            contentContainerStyle={{
                flexGrow: 1,
                padding: 20,
                backgroundColor: Colors.light.background,
            }}
        >
            {isLoading ? (
                <LoadingIndicator />
            ) : (
                <>
                    <View style={styles.insideContainer}>
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
                    </View>

                    <CustomButton
                        label="continue"
                        backgroundColor="white"
                        onPressHandler={handlePress}
                        disabled={chatHistoryLength < 3}
                        isChatButton={true}
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
        // paddingHorizontal: 20,
        flex: 1,
    },
    insideContainer: {
        flexGrow: 1,
        marginBottom: 20,
        // marginVertical: 20
        // margin: 20,
    },
    screenTitle: {
        fontSize: Colors.lessonName.fontSize,
        fontWeight: 'bold',
        color: Colors.header.color,
        marginBottom: 10,
        marginHorizontal: 10,
    },
});
