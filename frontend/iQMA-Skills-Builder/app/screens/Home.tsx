import * as accountEndpoints from '@/helpers/accountEndpoints';
import * as gamificationEndpoints from '@/helpers/gamificationEndpoints';
import * as lessonEndpoints from '@/helpers/lessonEndpoints';
import * as resultEndpoints from '@/helpers/resultEndpoints';
import * as sectionEndpoints from '@/helpers/sectionEndpoints';
import * as unitEndpoints from '@/helpers/unitEndpoints';
import * as userStoneProgressEndpoints from '@/helpers/userStoneProgressEndpoints';

import {
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import ProgressPath, { ProgressPathProps } from '@/components/ProgressPath';
import React, { useEffect, useRef, useState, useContext } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '@/context/AuthContext';
import { Colors } from '@/constants/Colors';
import FeedbackComponent from '@/components/Feedback';
import { Ionicons } from '@expo/vector-icons';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { SafeAreaView } from 'react-native-safe-area-context';
import SectionCard from '@/components/SectionCard';
import TopStats from '@/components/TopStats';
import { globalStyles } from '@/constants/styles';
import { router } from 'expo-router';

const HomeScreen: React.FC = () => {
    const { currentUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [sections, setSections] = useState<any[]>([]);
    const [iconsData, setIconsData] = useState<{ [sectionIndex: number]: { [unitIndex: number]: ProgressPathProps['icons'] } }>({});
    const [showButton, setShowButton] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const unitRefs = useRef<{ [key: string]: View | null }>({}); // 🔥 track unit Views for auto-scroll

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const yOffset = event.nativeEvent.contentOffset.y;
        setShowButton(yOffset > 0);
    };

    const onScrollToTop = () => {
        scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    };

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

    const buildSectionProgressPath = async (
        section: any,
        overallStartingIndex: number,
        lastCompletedIndex: number
    ): Promise<{ unitIcons: { [unitIndex: number]: ProgressPathProps['icons'] }, nextOverallIndex: number }> => {
        const unitIcons: { [unitIndex: number]: ProgressPathProps['icons'] } = {};
        const sectionID = section.sectionID;
        const units = await unitEndpoints.getUnitsForSection(sectionID);
        const totalUnits = units.length;

        if (units.length === 0) return { unitIcons, nextOverallIndex: overallStartingIndex };

        const totalProgress = totalUnits * 5;
        let overallIndex = overallStartingIndex;

        const getStoneStatus = (stoneIndex: number) => {
            if (stoneIndex <= lastCompletedIndex) return 'completed';
            if (stoneIndex === lastCompletedIndex + 1) return 'in-progress';
            return 'not-started';
        };

        for (let u = 0; u < units.length; u++) {
            const unit = units[u];
            const unitID = unit.unitID;
            const lessons = await lessonEndpoints.getAllLesson(sectionID, unitID);
            const totalLesson = lessons.length;
            const currentUnit = u + 1;

            const currentUnitIcons: ProgressPathProps['icons'] = [];

            // 1️⃣ Unit Intro
            if (u === 0) {
                currentUnitIcons.push({
                    name: 'playcircleo',
                    status: getStoneStatus(overallIndex),
                    onPress: () => handlePress('SectionIntroduction', sectionID, unitID, '', 0, 0, currentUnit, totalUnits, false, 0, totalProgress)
                });
                overallIndex++;
            } else {
                currentUnitIcons.push({
                    name: 'infocirlceo',
                    status: getStoneStatus(overallIndex),
                    onPress: () => handlePress('UnitIntroduction', sectionID, unitID, '', 0, 0, currentUnit, totalUnits, false, u * 5, totalProgress)
                });
                overallIndex++;
            }

            // 2️⃣ Lessons
            for (let i = 0; i < lessons.length; i++) {
                const lesson = lessons[i];
                currentUnitIcons.push({
                    name: 'book',
                    status: getStoneStatus(overallIndex),
                    onPress: () => handlePress('Lesson', sectionID, unitID, lesson.lessonID, i, totalLesson, currentUnit, totalUnits, false, 1 + (u * 5) + i, totalProgress)
                });
                overallIndex++;
            }

            // 3️⃣ Unit Assessment
            currentUnitIcons.push({
                name: 'key',
                status: getStoneStatus(overallIndex),
                onPress: () => handlePress('AssessmentIntroduction', sectionID, unitID, '', 0, 0, currentUnit, totalUnits, false, currentUnit * 5 - 1, totalProgress)
            });
            overallIndex++;

            unitIcons[u] = currentUnitIcons;
        }

        return { unitIcons, nextOverallIndex: overallIndex };
    };

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                // 🔥 Fetch user progress
                const progressData = await userStoneProgressEndpoints.getUserStoneProgress(currentUser.sub);
                const lastCompletedIndex = progressData?.last_completed_stone_index ?? -1;
                console.log('User Progress:', lastCompletedIndex);

                // 🔥 Fetch sections
                const sectionList = await sectionEndpoints.getAllSectionDetails();
                setSections(sectionList);

                const newIconsData: { [key: number]: { [key: number]: ProgressPathProps['icons'] } } = {};
                let overallStartingIndex = 0;

                for (let i = 0; i < sectionList.length; i++) {
                    const section = sectionList[i];
                    const { unitIcons, nextOverallIndex } = await buildSectionProgressPath(section, overallStartingIndex, lastCompletedIndex);
                    newIconsData[i] = unitIcons;
                    overallStartingIndex = nextOverallIndex;
                }

                setIconsData(newIconsData);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // 🔥 Scroll to in-progress unit after iconsData is ready
    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                for (const [sectionIndexStr, units] of Object.entries(iconsData)) {
                    for (const [unitIndexStr, unitIcons] of Object.entries(units)) {
                        const foundInProgress = unitIcons.some(icon => icon.status === 'in-progress');
                        if (foundInProgress) {
                            const key = `${sectionIndexStr}-${unitIndexStr}`;
                            const targetRef = unitRefs.current[key];
    
                            if (targetRef && scrollViewRef.current) {
                                (targetRef as any).measureLayout(
                                    scrollViewRef.current,
                                    (x: number, y: number) => {
                                        scrollViewRef.current?.scrollTo({ y: y - 0, animated: true });
                                    },
                                    (error: any) => {
                                        console.error('Auto-scroll measure error:', error);
                                    }
                                );
                            }
                            return;
                        }
                    }
                }
            }, 500);
        }
    }, [loading, iconsData]);
    

    if (loading) return <LoadingIndicator />;

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView
                contentContainerStyle={styles.container}
                onScroll={onScroll}
                scrollEventThrottle={16}
                ref={scrollViewRef}
            >
                <TopStats circularProgress={0} />

                {sections.map((section, sectionIndex) => (
                    <View key={sectionIndex}>
                        {Object.entries(iconsData[sectionIndex] || {}).map(([unitIndex, unitIcons]) => {
                            const key = `${sectionIndex}-${unitIndex}`;
                            return (
                                <View
                                    key={key}
                                    ref={el => { unitRefs.current[key] = el; }}
                                    style={{ marginBottom: 20 }}
                                >
                                    <SectionCard
                                        title={`Section ${sectionIndex + 1}, Unit ${parseInt(unitIndex) + 1}`}
                                        subtitle={section.sectionName}
                                    />
                                    <ProgressPath icons={unitIcons} circularProgress={0} />
                                </View>
                            );
                        })}
                    </View>
                ))}
            </ScrollView>

            {showButton && (
                <TouchableOpacity style={styles.floatingButton} onPress={onScrollToTop}>
                    <Ionicons name="arrow-up" size={24} color="#7654F2" />
                </TouchableOpacity>
            )}

            <FeedbackComponent userID={currentUser.sub} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
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

