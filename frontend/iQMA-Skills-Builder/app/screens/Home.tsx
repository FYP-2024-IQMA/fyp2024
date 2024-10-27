// screens/HomeScreen.tsx

import * as accountEndpoints from '@/helpers/accountEndpoints';
import * as gamificationEndpoints from '@/helpers/gamificationEndpoints';
import * as lessonEndpoints from '@/helpers/lessonEndpoints';
import * as resultEndpoints from '@/helpers/resultEndpoints';
import * as sectionEndpoints from '@/helpers/sectionEndpoints';
import * as unitEndpoints from '@/helpers/unitEndpoints';

import {
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ProgressPath, {ProgressPathProps} from '@/components/ProgressPath';
import React, {useEffect, useRef, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '@/context/AuthContext';
import {Colors} from '@/constants/Colors';
import FeedbackComponent from '@/components/Feedback';
import {Ionicons} from '@expo/vector-icons';
import {LoadingIndicator} from '@/components/LoadingIndicator';
import {SafeAreaView} from 'react-native-safe-area-context';
import SectionCard from '@/components/SectionCard';
import TopStats from '@/components/TopStats';
import {globalStyles} from '@/constants/styles';
import {packageFeedback} from '@/helpers/feedbackEndpoints';
import {router} from 'expo-router';
import {useContext} from 'react';

const HomeScreen: React.FC = () => {
    const {currentUser, isLoading} = useContext(AuthContext);
    const [circularProgress, setCircularProgress] = useState<number>(0);
    const [sectionCircularProgress, setSectionCircularProgress] =
        useState<number>(0);
    const [allSectionDetails, setAllSectionDetails] = useState<any[]>([]);
    const [iconsData, setIconsData] = useState<{
        [key: number]: ProgressPathProps['icons'];
    }>({});
    const [loading, setLoading] = useState(true);
    const [completedFinals, setCompletedFinals] = useState<boolean>(false);
    const [showButton, setShowButton] = useState(false);
    const [userPoints, setUserPoints] = useState<number>(0);

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const yOffset = event.nativeEvent.contentOffset.y;
        if (yOffset > 0) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    // Create a reference to the ScrollView
    const scrollViewRef = useRef<ScrollView>(null);

    // Scroll handler
    const onScrollToTop = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true}); //animated: true for smooth scrolling
        }
    };
    const loadUnitCircularProgress = async (
        userID: string,
        sectionID: string,
        unitID: string,
        isLastUnit: boolean
        // completedFinals: boolean
    ) => {
        console.log('LOAD UNIT CIRCULAR PROGRESS');
        console.log(userID, sectionID, unitID);

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
                setCircularProgress(() =>
                    Math.ceil((completedLU / (noOfLessonPerUnit + 1)) * 100)
                );
            } else {
                setCircularProgress(() => Math.ceil(circularProgress * 100));
            }
        } catch (error) {
            console.error('Error while loading circular progress:', error);
        }
    };

    // number of units user did out of total units in that section (completed units/ total units)
    // for top right circular progress
    // will show 0 if only lessons done in unit 1, because it 0 units completed
    const loadSectionProgress = async (
        userID: string,
        sectionID: string
    ): Promise<number> => {
        try {
            let sectionProgress =
                await resultEndpoints.numberOfCompletedUnitsPerSection(
                    userID,
                    sectionID
                );

            const noOfUnits = await unitEndpoints.numberOfUnitsPerSection(
                sectionID
            );
            // const noOfUnits = 4; // (ger testing)

            // need to + 1 to sectionProgress when user complete final assessment
            if (completedFinals) sectionProgress += 1;

            setSectionCircularProgress(() =>
                Math.ceil((sectionProgress / (noOfUnits + 1)) * 100)
            );

            return Math.ceil((sectionProgress / (noOfUnits + 1)) * 100);
        } catch (error) {
            console.error('Error while loading section progress:', error);
            return 0;
        }
    };

    const getIconStatus = async (
        sectionID: string,
        circularProgress: number,
        completedUnits: number,
        isLastUnit: boolean
    ) => {
        const iconTypes = ['Trophy', 'staro', 'key', 'book'];

        console.log('Section ID:', sectionID);
        const totalUnits = await unitEndpoints.numberOfUnitsPerSection(
            sectionID
        );
        // const totalUnits = 4; // (ger testing)
        let currentUnit = completedUnits + 1;
        if (currentUnit > totalUnits) {
            currentUnit = totalUnits;
        }

        const iconsData = [];
        for (let i = 0; i < totalUnits; i++) {
            const icon = iconTypes[i % iconTypes.length];
            let status = 'not-started';
            let routerName = 'UnitIntroduction';
            const unitID = `UNIT${(i + 1).toString().padStart(4, '0')}`;
            // console.log('Unit ID:', unitID);

            const completedLessons =
                await resultEndpoints.numberOfCompletedLessonsPerUnit(
                    currentUser.sub,
                    sectionID,
                    unitID
                );
            const totalLesson = await lessonEndpoints.getNumofLessonsPerUnit(
                sectionID,
                unitID
            );

            // console.log("sectionID", sectionID)
            // console.log("unitID", unitID)
            // console.log("totalLesson", totalLesson)

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

            // console.log('Lesson IDs:', getLessonIds);

            const totalProgress = accountEndpoints.calculateTotalProgress(
                i,
                totalUnits,
                getLessonIds
            );
            let currentProgress = 1;

            let currentLessonId = getAllLessons[0].lessonID;
            let currentLessonIdx = 0;
            let isFinal = false;

            const finishEverything =
                currentUnit === totalUnits &&
                circularProgress === 100 &&
                sectionCircularProgress === 100;

            if (i + 1 < currentUnit || finishEverything) {
                status = 'completed';
                if (i === 0) {
                    routerName = 'SectionIntroduction';
                }
            } else if (i + 1 === currentUnit) {
                status = 'in-progress';

                if (
                    totalLesson === completedLessons &&
                    circularProgress !== 100
                ) {
                    routerName = 'AssessmentIntroduction';

                    currentProgress =
                        i === totalUnits - 1
                            ? totalProgress - 5
                            : totalProgress - 3;

                    if (isLastUnit) {
                        isFinal = true;
                        currentProgress = totalProgress - 1;
                    }
                } else {
                    if (getAllLessons[completedLessons]) {
                        currentLessonId =
                            getAllLessons[completedLessons].lessonID;
                    }
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

            iconsData.push({
                name: icon,
                status,
                onPress: () =>
                    handlePress(
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
                        totalProgress
                    ),
            });
        }
        return iconsData;
    };

    const fetchProgressDataNew = async (secId: number) => {
        const sectionID = `SEC${secId.toString().padStart(4, '0')}`;

        const completedUnits =
            await resultEndpoints.numberOfCompletedUnitsPerSection(
                currentUser.sub,
                sectionID
            );

        const totalUnits = await unitEndpoints.numberOfUnitsPerSection(
            sectionID
        );
        // const totalUnits = 4; // (ger testing)

        // unit to light up (current unit)
        let lightedUnit = completedUnits + 1;
        let isLastUnit = false;

        if (lightedUnit > totalUnits) {
            lightedUnit = totalUnits;
            isLastUnit = true;
        }

        const unitID = `UNIT${lightedUnit.toString().padStart(4, '0')}`;

        // circular progress is set inside here
        await loadUnitCircularProgress(
            currentUser.sub,
            sectionID,
            unitID,
            isLastUnit
        );

        const iconsStatus = await getIconStatus(
            sectionID,
            circularProgress,
            completedUnits,
            isLastUnit
        );

        return iconsStatus;
    };

    useEffect(() => {
        (async () => {
            try {
                AsyncStorage.setItem('totalPoints', '0');

                const pt = AsyncStorage.getItem('totalPoints');

                const sectionDetails =
                    await sectionEndpoints.getAllSectionDetails();
                let currentSection = await resultEndpoints.getCurrentSection(
                    currentUser.sub
                );
                console.log('Current Section Outside:', currentSection);

                const gamificationData = await gamificationEndpoints.getStreak(
                    currentUser.sub
                );
                console.log(gamificationData);
                setUserPoints(gamificationData.points);

                if (currentSection > sectionDetails.length) {
                    currentSection = sectionDetails.length;
                    console.log(
                        'Current Section when completed all section:',
                        currentSection
                    );
                    setCompletedFinals(() => true);
                }

                setAllSectionDetails(
                    sectionDetails.slice(0, currentSection + 1)
                );

                await AsyncStorage.setItem(
                    'currentSection',
                    currentSection.toString()
                );

                const sectionID = `SEC${currentSection
                    .toString()
                    .padStart(4, '0')}`;
                await AsyncStorage.setItem('sectionID', sectionID);

                // sectionID is based on currentSection
                await loadSectionProgress(currentUser.sub, sectionID);

                // Initialize iconsData
                const newIconsData: {
                    [key: number]: ProgressPathProps['icons'];
                } = {};

                // Load iconsData based on currentSection
                for (let i = 0; i < currentSection; i++) {
                    const progressData = await fetchProgressDataNew(i + 1);
                    newIconsData[i] = progressData!;
                }

                setIconsData(newIconsData);
            } catch (error) {
                console.log('Error Loading Data', error);
            } finally {
                setLoading(false);
            }
        })();
    }, [completedFinals, sectionCircularProgress, circularProgress]);

    useEffect(() => {}, [allSectionDetails]);

    const handlePress = (
        pathName: string,
        sectionID: string,
        unitID: string,
        lessonID: string,
        currentLessonIdx: number,
        totalLesson: number,
        currentUnit: number,
        totalUnits: number,
        isFinal: boolean,
        currentProgress: number,
        totalProgress: number
    ) => {
        console.log('Pressed in HOME');
        console.log(
            pathName,
            sectionID,
            unitID,
            lessonID,
            currentLessonIdx,
            totalLesson,
            currentUnit,
            totalUnits,
            isFinal
        );

        console.log(
            'Current Progress:',
            currentProgress,
            'Total Progress:',
            totalProgress
        );

        router.push({
            pathname: pathName,
            params: {
                sectionID,
                unitID,
                lessonID,
                currentLessonIdx,
                totalLesson,
                currentUnit,
                totalUnits,
                isFinal: isFinal.toString(),
                currentProgress,
                totalProgress,
            },
        });
    };

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView
                contentContainerStyle={styles.container}
                onScroll={onScroll}
                scrollEventThrottle={16}
                ref={scrollViewRef}
            >
                {/* Top Stats */}
                <TopStats
                    circularProgress={sectionCircularProgress}
                    points={userPoints}
                />

                {allSectionDetails.length > 0 ? (
                    allSectionDetails.map((sectionDetail, index) => (
                        <View key={index}>
                            <SectionCard
                                title={`SECTION ${index + 1}`}
                                subtitle={sectionDetail.sectionName}
                            />
                            <ProgressPath
                                icons={iconsData[index] || []}
                                circularProgress={circularProgress}
                            />
                        </View>
                    ))
                ) : (
                    <Text>No sections available</Text>
                )}
            </ScrollView>
            {showButton && (
                <TouchableOpacity
                    style={styles.floatingButton}
                    onPress={onScrollToTop}
                >
                    <Ionicons name="arrow-up" size={24} color="#7654F2" />
                </TouchableOpacity>
            )}
            <FeedbackComponent userID={currentUser.sub} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    // outerContainer: {
    //     flex: 1,
    // },
    container: {
        padding: 20,
        // backgroundColor: '#F5F5F5',
    },
    lineSeparator: {
        height: 1,
        backgroundColor: '#CCC',
        marginVertical: 10,
    },

    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    dividerText: {
        marginHorizontal: 10,
        fontWeight: 'bold',
        color: '#AAAAAA',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: Colors.default.purple100,
        borderRadius: 10,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
});

export default HomeScreen;
