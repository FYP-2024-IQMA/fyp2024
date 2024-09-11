// screens/HomeScreen.tsx

import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '@/context/AuthContext';
import ProgressPath, {ProgressPathProps} from '@/components/ProgressPath';
import SectionCard from '@/components/SectionCard';
import TopStats from '@/components/TopStats';
import {useContext} from 'react';
import {router} from 'expo-router';
import * as sectionEndpoints from '@/helpers/sectionEndpoints';
import * as unitEndpoints from '@/helpers/unitEndpoints';
import * as lessonEndpoints from '@/helpers/lessonEndpoints';
import * as resultEndpoints from '@/helpers/resultEndpoints';

const HomeScreen: React.FC = () => {
    const {currentUser, isLoading} = useContext(AuthContext);
    const [circularProgress, setCircularProgress] = useState<number>(0);
    const [sectionCircularProgress, setSectionCircularProgress] = useState<number>(0);
    const [allSectionDetails, setAllSectionDetails] = useState<any[]>([]);
    const [iconsData, setIconsData] = useState<{ [key: number]: ProgressPathProps['icons'] }>({});
    const [loading, setLoading] = useState(true);

    const loadUnitCircularProgress = async (
        userID: string,
        sectionID: string,
        unitID: string
    ) => {
        console.log('LOAD UNIT CIRCULAR PROGRESS');
        // console.log(userID, sectionID, unitID);

        try {
            const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/result/getcircularprogress/${userID}/${sectionID}/${unitID}`;
            const response = await fetch(url);
            const circularProgress = await response.json();
            setCircularProgress(circularProgress * 100);
        } catch (error) {
            console.error('Error while loading circular progress:', error);
        }
    };

    const getCurrentSection = async (): Promise<number> => {
        try {
            const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/result/getuserprogress/${currentUser.sub}`;
            const response = await fetch(url);
            const completedSection = await response.json();
            return completedSection + 1;
        } catch (error) {
            console.error('Error while loading current section:', error);
            return 0;
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
            const sectionProgress =
                await resultEndpoints.numberOfCompletedUnitsPerSection(
                    userID,
                    sectionID
                );

            const noOfUnits = await unitEndpoints.numberOfUnitsPerSection(
                sectionID
            );

            setSectionCircularProgress(
                Math.ceil((sectionProgress / noOfUnits) * 100)
            );

            return sectionProgress;
        } catch (error) {
            console.error('Error while loading section progress:', error);
            return 0;
        }
    };

    const getIconStatus = async (
        sectionID: string,
        circularProgress: number,
        completedUnits: number,
        totalLesson: number,
        completedLessons: number,
        currentLessonId?: string
    ) => {
        const iconTypes = ['Trophy', 'staro', 'key', 'book'];

        // console.log('Section ID:', sectionID);
        const totalUnits = await unitEndpoints.numberOfUnitsPerSection(sectionID);
        const currentUnit = completedUnits + 1;

        // console.log('Current Unit:', currentUnit);
        // // % of lesson & unit quiz completion
        // console.log('circular progress:', circularProgress);
        // console.log('total lesson:', totalLesson);
        // console.log('completed lessons:', completedLessons);
        // console.log('current lesson id:', currentLessonId);

        return Array.from({length: totalUnits}, (_, index) => {
            const icon = iconTypes[index % iconTypes.length];
            let status = 'not-started';
            let routerName = 'UnitIntroduction';

            const unitID = `UNIT${(index + 1).toString().padStart(4, '0')}`;

            if (index + 1 === currentUnit) {
                status = 'in-progress';

                if (
                    totalLesson === completedLessons &&
                    circularProgress !== 100
                ) {
                    routerName = 'CheatSheet';
                } else if (completedLessons !== 0) {
                    routerName = 'Lesson';
                } else if (completedUnits === 0) {
                    routerName = 'SectionIntroduction';
                }
            } else if (index + 1 < currentUnit) {
                status = 'completed';
                if (index === 0) {
                    routerName = 'SectionIntroduction';
                }
            }

            if (currentLessonId !== null) {
                return {
                    name: icon,
                    status,
                    onPress: () => handlePress(routerName, sectionID, unitID, currentLessonId),
                };
            }

            return {
                name: icon,
                status,
                onPress: () => handlePress(routerName, sectionID, unitID),
            };
        });
    };

    const fetchProgressDataNew = async (secId: number) => {
        const sectionID = `SEC${secId.toString().padStart(4, '0')}`;

        const completedUnits = await resultEndpoints.numberOfCompletedUnitsPerSection(currentUser.sub, sectionID);

        // unit to light up (current unit)
        const lightedUnit = completedUnits + 1;
        const unitID = `UNIT${lightedUnit.toString().padStart(4, '0')}`;

        const completedLessons = await resultEndpoints.numberOfCompletedLessonsPerUnit(currentUser.sub, sectionID, unitID);
        // setCompletedLessons(completedLessons);
        const totalLesson = await lessonEndpoints.getNumofLessonsPerUnit(sectionID, unitID);
        // setTotalLesson(totalLesson);

        const getAllLessons = await lessonEndpoints.getAllLesson(sectionID, unitID);

        let currentLessonId = null;

        if (completedLessons < totalLesson) {
            // no need to add 1 because indexing starts from 0
            currentLessonId = getAllLessons[completedLessons].lessonID;
        }

        // circular progress is set inside here
        loadUnitCircularProgress(currentUser.sub, sectionID, unitID);

        const iconsStatus = await getIconStatus(
            sectionID,
            circularProgress,
            completedUnits,
            totalLesson,
            completedLessons,
            currentLessonId
        );

        return iconsStatus;
    };

    useEffect(() => {

        (async () => {
            try {
                const sectionDetails =
                    await sectionEndpoints.getAllSectionDetails();
                const currentSection = await getCurrentSection();
                console.log(currentSection);
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

                await loadSectionProgress(currentUser.sub, sectionID);

                // Initialize iconsData
                const newIconsData: {
                    [key: number]: ProgressPathProps['icons'];
                } = {};

                // Load iconsData based on currentSection
                for (let i = 0; i < currentSection; i++) {
                    const progressData = await fetchProgressDataNew(i + 1);
                    newIconsData[i] = progressData;
                }

                setIconsData(newIconsData);
            } catch (error) {
                console.log('Error Loading Data', error);
            } finally {
                setLoading(false);
            }
        })();

    }, []);

    useEffect(() => {
        console.log('All Section Details:', allSectionDetails);
    }, [allSectionDetails]);

    const handlePress = (
        pathName: string,
        sectionID: string,
        unitID?: string,
        lessonID?: string
    ) => {
        console.log('Pressed in HOME');
        console.log(pathName, sectionID, unitID, lessonID);
        router.push({
            pathname: pathName,
            params: {sectionID: sectionID, unitID: unitID, lessonID: lessonID},
        });
    };

    if (loading) {
        // add spinner next time
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Top Stats */}
            <TopStats circularProgress={sectionCircularProgress} />

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
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F5F5F5',
        marginTop: 10,
    },
    lineSeparator: {
        height: 1,
        backgroundColor: '#CCC',
        marginVertical: 10,
    },
    sectionLabel: {
        textAlign: 'center',
        color: '#666',
        marginBottom: 20,
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
});

export default HomeScreen;
