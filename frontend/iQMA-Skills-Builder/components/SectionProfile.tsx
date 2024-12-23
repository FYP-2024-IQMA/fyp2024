// components/SectionProfile.tsx

import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

import {Colors} from '@/constants/Colors';
import React, {useEffect, useRef, useState, useContext} from 'react';
import * as resultEndpoints from '@/helpers/resultEndpoints';
import * as unitEndpoints from '@/helpers/unitEndpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {formatSection} from '@/helpers/formatSectionID';
import ProgressBar from '@/components/ProgressBar';
import {AuthContext} from '@/context/AuthContext';
import {router, useLocalSearchParams} from 'expo-router';
import * as accountEndpoints from '@/helpers/accountEndpoints';
import * as lessonEndpoints from '@/helpers/lessonEndpoints';
import {SectionProfileProgressBar} from './SectionProfileProgressBar';

interface SectionProfileProps {
    sectionID: string;
    sectionName: string;
    sectionDuration: number;
}

const SectionProfile: React.FC<SectionProfileProps> = ({
    sectionID,
    sectionName,
    sectionDuration,
}) => {
    const {currentUser, isLoading} = useContext(AuthContext);
    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [sectionCircularProgress, setSectionCircularProgress] =
        useState<number>(0);
    const [status, setStatus] = useState<string>('in-progress');
    // const [completedFinals, setCompletedFinals] = useState<boolean>(false);
    const [handlePressParams, setHandlePressParams] = useState<any>();

    const loadUnitCircularProgress = async (
        userID: string,
        sectionID: string,
        unitID: string,
        isLastUnit: boolean,
        completedFinals: boolean
    ) => {
        // console.log('LOAD UNIT CIRCULAR PROGRESS IN PROFILE PAGE');
        // console.log(userID, sectionID, unitID, isLastUnit);

        try {
            const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/result/getcircularprogress/${userID}/${sectionID}/${unitID}`;
            const response = await fetch(url);
            const circularProgress = await response.json();
            if (isLastUnit) {
                const noOfLessonPerUnit =
                    (await lessonEndpoints.getNumofLessonsPerUnit(
                        sectionID,
                        unitID
                    )) + 1;
                let completedLU = circularProgress * noOfLessonPerUnit;

                // need to + 1 to completedLU when user complete final assessment
                if (completedFinals) {
                    completedLU += 1;
                }

                return Math.ceil((completedLU / (noOfLessonPerUnit + 1)) * 100);
            } else {
                return Math.ceil(circularProgress * 100);
            }
        } catch (error) {
            console.error('Error while loading circular progress:', error);
        }
    };

    const testing = async (
        userID: string,
        sectionID: string,
        completedUnits: number,
        isLastUnit: boolean,
        totalUnits: number,
        unitIdx: number,
        circularProgress: number,
        sectionCircularProgress: number,
        completedFinals?: boolean
    ) => {
        console.log('Section ID IN TESTING:', sectionID);
        let routerName = 'UnitIntroduction';
        let status = 'not-started';
        let currentUnit = completedUnits + 1;
        if (currentUnit > totalUnits) {
            currentUnit = totalUnits;
        }

        const unitID = `UNIT${(unitIdx + 1).toString().padStart(4, '0')}`;
        const completedLessons =
            await resultEndpoints.numberOfCompletedLessonsPerUnit(
                userID,
                sectionID,
                unitID
            );

        const totalLesson = await lessonEndpoints.getNumofLessonsPerUnit(
            sectionID,
            unitID
        );

        const getAllLessons = await lessonEndpoints.getAllLesson(
            sectionID,
            unitID
        );

        if (getAllLessons.length === 0) {
            return;
        }

        const getLessonIds = getAllLessons.map(
            (lesson: any) => lesson.lessonID.split('.')[0]
        );

        const totalProgress = accountEndpoints.calculateTotalProgress(
            unitIdx,
            totalUnits,
            getLessonIds
        );

        let currentProgress = 1;
        let currentLessonId = getAllLessons[0].lessonID;
        // let currentLessonId = '1a';
        let currentLessonIdx = 0;
        let isFinal = false;
        const finishEverything =
            currentUnit === totalUnits &&
            circularProgress === 100 &&
            sectionCircularProgress === 100;
        if (unitIdx + 1 < currentUnit || finishEverything) {
            status = 'completed';
            if (unitIdx === 0) {
                routerName = 'SectionIntroduction';
            }
        } else if (unitIdx + 1 === currentUnit) {
            status = 'in-progress';
            if (totalLesson === completedLessons && circularProgress !== 100) {
                routerName = 'AssessmentIntroduction';
                currentProgress =
                    unitIdx === totalUnits - 1
                        ? totalProgress - 5
                        : totalProgress - 3;
                if (isLastUnit) {
                    isFinal = true;
                    currentProgress = totalProgress - 1;
                }
            } else {
                if (getAllLessons[completedLessons]) {
                    currentLessonId = getAllLessons[completedLessons].lessonID;
                }
                // currentLessonId = '1a'
                currentLessonIdx = completedLessons;
                if (completedLessons !== 0) {
                    routerName = 'Lesson';
                    currentProgress =
                        1 +
                        completedLessons * 2 +
                        accountEndpoints.calculateKTProgress(
                            getLessonIds,
                            completedLessons
                        );
                    // console.log('Current Progress:', currentProgress);
                } else if (completedUnits === 0) {
                    routerName = 'SectionIntroduction';
                }
            }
        }

        if (completedFinals) {
            routerName = 'SectionIntroduction';
        }

        const iconStatus = {
            status,
            routerName,
            sectionID,
            unitID,
            currentLessonId,
            currentLessonIdx,
            totalLesson,
            currentUnit,
            totalUnits,
            isFinal,
            currentProgress,
            totalProgress,
        };

        return iconStatus;
    };

    useEffect(() => {
        (async () => {
            // KIV: if no check sectionProgress and noOfUnits to see if user is in the middle of the section

            let sectionProgress =
                await resultEndpoints.numberOfCompletedUnitsPerSection(
                    currentUser.sub,
                    sectionID
                );

            const totalUnits = await unitEndpoints.numberOfUnitsPerSection(
                sectionID
            );

            const currentSection = await AsyncStorage.getItem('currentSection');

            const sectionParam = formatSection(sectionID as string);
            setSectionNumber(sectionParam);

            console.log('Section ID PROFILE PAGE:', sectionID);

            if (parseInt(sectionParam) > parseInt(currentSection!)) {
                setStatus('not-started');
            } else {
                let lightedUnit = sectionProgress + 1;
                let isLastUnit = false;

                if (lightedUnit > totalUnits) {
                    lightedUnit = totalUnits;
                    isLastUnit = true;
                }

                const completedSection =
                    await resultEndpoints.checkIfCompletedSection(
                        currentUser.sub,
                        sectionID
                    );

                let sectionCirProgress = sectionProgress / (totalUnits + 1);

                if (completedSection) {
                    setSectionCircularProgress(
                        () => (sectionProgress + 1) / (totalUnits + 1)
                    );
                    sectionCirProgress =
                        (sectionProgress + 1) / (totalUnits + 1);
                } else {
                    setSectionCircularProgress(
                        () => sectionProgress / (totalUnits + 1)
                    );
                }

                const unitID = `UNIT${lightedUnit.toString().padStart(4, '0')}`;

                const circularProgress = await loadUnitCircularProgress(
                    currentUser.sub,
                    sectionID,
                    unitID,
                    isLastUnit,
                    completedSection
                );

                // userID: string,
                // sectionID: string,
                // completedUnits: number,
                // isLastUnit: boolean,
                // totalUnits: number,
                // unitIdx: number,
                // circularProgress: number,
                // sectionCircularProgress: number

                const iconStatus = await testing(
                    currentUser.sub,
                    sectionID,
                    sectionProgress,
                    isLastUnit,
                    totalUnits,
                    lightedUnit - 1,
                    circularProgress!,
                    sectionCirProgress * 100,
                    completedSection
                );

                setHandlePressParams(iconStatus);
            }
        })();
    }, [sectionCircularProgress]);

    useEffect(() => {
        if (handlePressParams) {
            console.log('STATUS:', handlePressParams.status);
            setStatus(() => handlePressParams.status);
        }
    }, [handlePressParams]);

    const handlePress = () => {
        console.log('Pressed in SECTION PROFILE');

        // check if final assessment is completed
        // if yes route to Section Introduction

        console.log(
            handlePressParams.status,
            handlePressParams.routerName,
            sectionID,
            handlePressParams.unitID,
            handlePressParams.currentLessonId,
            handlePressParams.currentLessonIdx,
            handlePressParams.totalLesson,
            handlePressParams.currentUnit,
            handlePressParams.totalUnits,
            handlePressParams.isFinal,
            handlePressParams.currentProgress,
            handlePressParams.totalProgress
        );

        // let pathName = handlePressParams.routerName;

        // if (handlePressParams.status === 'completed') {
        //     pathName = 'SectionIntroduction';
        // }

        router.push({
            pathname: handlePressParams.routerName,
            params: {
                sectionID,
                unitID: handlePressParams.unitID,
                lessonID: handlePressParams.currentLessonId,
                currentLessonIdx: handlePressParams.currentLessonIdx,
                totalLesson: handlePressParams.totalLesson,
                currentUnit: handlePressParams.currentUnit,
                totalUnits: handlePressParams.totalUnits,
                isFinal: handlePressParams.isFinal.toString(),
                currentProgress: handlePressParams.currentProgress,
                totalProgress: handlePressParams.totalProgress,
            },
        });
    };

    return (
        <View style={styles.main}>
            <TouchableOpacity
                style={styles.sectionCard}
                onPress={handlePress}
                disabled={status === 'not-started'}
            >
                <Image
                    source={require('../assets/images/communication.jpg')}
                    style={styles.image}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.sectionTitle}>
                        SECTION {sectionNumber}
                    </Text>
                    <Text style={styles.sectionName}>{sectionName}</Text>
                    <View style={styles.progressBarContainer}>
                        {/* <ProgressBar
                            progress={sectionCircularProgress}
                            isQuestionnaire={true}
                        /> */}
                        <SectionProfileProgressBar
                            progress={sectionCircularProgress}
                        ></SectionProfileProgressBar>
                    </View>
                    <View style={styles.durationContainer}>
                        <Text style={styles.duration}>
                            {sectionDuration + 'm'}
                        </Text>
                    </View>
                </View>

                {status === 'not-started' && (
                    <View style={styles.lockOverlay}>
                        <Text style={styles.lockedText}>LOCKED</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: 150, // Adjust the height to whatever size you'd like the image to be
        resizeMode: 'cover',
    },
    sectionCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        borderColor: '#D1D5DB',
        borderWidth: 1,
        overflow: 'hidden', // Makes sure image edges are rounded with the sectionCard
        marginTop: 10,
        elevation: 2,
    },
    disabledSectionCard: {
        backgroundColor: 'gray', // or any color to indicate disabled state
    },
    textContainer: {
        flexDirection: 'column',
        padding: 20,
        gap: 3,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    sectionName: {
        fontWeight: 'bold',
    },
    progressBarContainer: {
        paddingVertical: 10,
    },
    durationContainer: {
        flexDirection: 'row-reverse',
    },
    duration: {
        fontSize: 12,
        color: Colors.default.optionText,
    },
    lockOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lockedText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default SectionProfile;
