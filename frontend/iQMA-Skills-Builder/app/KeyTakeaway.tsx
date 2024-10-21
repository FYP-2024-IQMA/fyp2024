import * as lessonEndpoints from '@/helpers/lessonEndpoints';
import * as unitEndpoints from '@/helpers/unitEndpoints';

import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {router, useLocalSearchParams, useRouter} from 'expo-router';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '@/context/AuthContext';
import {Colors} from '@/constants/Colors';
import {CustomButton} from '@/components/CustomButton';
import {LoadingIndicator} from '@/components/LoadingIndicator';
import {OverviewCard} from '@/components/OverviewCard';
import ProgressBar from '@/components/ProgressBar';
import SectionCard from '@/components/SectionCard';
import axios from 'axios';
import {formatSection} from '@/helpers/formatSectionID';
import {formatUnit} from '@/helpers/formatUnitID';
import {useNavigation} from '@react-navigation/native';
import {useTimer} from '@/helpers/useTimer';

export default function KeyTakeaway() {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {currentUser, _} = useContext(AuthContext);

    useLayoutEffect(() => {
        const progress =
            parseInt(currentProgress as string) /
            parseInt(totalProgress as string);

        navigation.setOptions({
            headerTitle: () => (
                <ProgressBar progress={progress} isQuestionnaire={false} />
            ),
        });
    }, [navigation]);

    const handlePress = async () => {
        let nextLessonIdx = parseInt(currentLessonIdx as string) + 1;
        let pathName = 'Lesson';

        // If it is the last lesson, go to Assessment Intro for Unit Assessment (AssessmentIntroduction.tsx)
        if (nextLessonIdx === parseInt(totalLesson as string)) {
            // lessonIdx can be anything because will reset in Home
            nextLessonIdx = 0;
            pathName = 'AssessmentIntroduction';
        }

        console.log('nextLessonIdx:', nextLessonIdx);
        console.log('nextLessonID:', nextLessonID);

        router.push({
            pathname: pathName,
            params: {
                sectionID,
                unitID,
                lessonID: nextLessonID,
                currentLessonIdx: nextLessonIdx,
                totalLesson,
                currentUnit,
                totalUnits,
                isFinal: 'false',
                currentProgress: (
                    parseInt(currentProgress as string) + 1
                ).toString(),
                totalProgress,
            },
        });
        stopTimer();
    };

    // const sectionID = 'SEC0001';
    // const unitID = 'UNIT0002';
    // const lessonID = '2a';
    // const currentLessonIdx = '0';
    // const totalLesson = '3';
    // const currentUnit = '3';
    // const totalUnits = '3';
    const {
        sectionID,
        unitID,
        lessonID,
        currentLessonIdx,
        totalLesson,
        currentUnit,
        totalUnits,
        currentProgress,
        totalProgress,
    } = useLocalSearchParams();
    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [unitNumber, setUnitNumber] = useState<string>('');
    const [unitName, setUnitName] = useState<string>('');
    const [lessonName, setLessonName] = useState<string>('');
    const [keyTakeaway, setKeyTakeaway] = useState<string[]>([]);
    const [nextLessonID, setnextLessonID] = useState<string>('');
    const {startTimer, stopTimer} = useTimer(
        `${sectionID} ${unitID} ${lessonID} Key Takeaway`
    );

    useEffect(() => {
        startTimer();
        if (
            sectionID &&
            unitID &&
            lessonID &&
            currentLessonIdx &&
            totalLesson
        ) {
            (async () => {
                try {
                    const unitDetails = await unitEndpoints.getUnitDetails(
                        sectionID as string,
                        unitID as string
                    );

                    const lessonDetails =
                        await lessonEndpoints.getLessonDetails(
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
                        nxtLessonIdx = 0;
                    }

                    if (lessonID.includes('.')) {
                        lessonDetails.lessonName =
                            lessonDetails.lessonName.replace(/\.\d+/, '');
                    }

                    setnextLessonID(getAllLessons[nxtLessonIdx].lessonID);
                    setLessonName(lessonDetails.lessonName);
                    setUnitName(unitDetails.unitName);
                    setKeyTakeaway(lessonDetails.lessonKeyTakeaway);
                    setSectionNumber(formatSection(sectionID as string));
                    setUnitNumber(formatUnit(unitID as string));
                } catch (error) {
                    console.error('Error fetching in Key Takeaway:', error);
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [sectionID, unitID, nextLessonID]);

    return (
        <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            style={styles.container}
        >
            {isLoading ? (
                <LoadingIndicator />
            ) : (
                <>
                    <View>
                        <SectionCard
                            title={`SECTION ${sectionNumber}, UNIT ${unitNumber}`}
                            subtitle={unitName}
                        />
                        <Text style={styles.screenTitle}>{lessonName}</Text>

                        <Text style={styles.takeawayHeader}>Key Takeaways</Text>
                        {keyTakeaway && keyTakeaway.length > 0 ? (
                            keyTakeaway.map(
                                (takeaway: string, index: number) => (
                                    <View key={index}>
                                        <Text style={styles.takeawayText}>
                                            {index + 1}. {takeaway}
                                        </Text>
                                    </View>
                                )
                            )
                        ) : (
                            <OverviewCard
                                isError={true}
                                text="Key Takeaways are not available. Please check with your administrator."
                            />
                        )}

                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'row-reverse',
                            }}
                        >
                            <Image
                                style={{height: 110}}
                                source={require('@/assets/images/happycloseeye.png')}
                            ></Image>
                        </View>
                    </View>
                    <View style={{marginBottom: 40}}>
                        <CustomButton
                            label="continue"
                            backgroundColor="white"
                            onPressHandler={handlePress}
                        />
                    </View>
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
    takeawayHeader: {
        marginBottom: 10,
        marginLeft: 15,
        color: Colors.header.color,
        fontWeight: 'bold',
        fontSize: Colors.header.fontSize,
    },
    takeawayText: {
        marginLeft: 15,
        fontSize: Colors.text.fontSize,
        lineHeight: 22,
        color: Colors.header.color,
        marginBottom: 25,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 20,
    },
});
