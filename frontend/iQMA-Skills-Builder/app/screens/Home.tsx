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
    const unitRefs = useRef<{ [key: string]: View | null }>({});

    const [currentStoneIndex, setCurrentStoneIndex] = useState<number | null>(null);
    const [currentScreenIndex, setCurrentScreenIndex] = useState<number>(0);
    const [currentScreenPathname, setCurrentScreenPathname] = useState<string | null>(null);

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
        isFinal: boolean,
        stoneIndex: number,
        screenIndex: number,
        totalScreens: number
    ) => {
        router.push({
            pathname: pathName,
            params: {
                sectionID,
                unitID,
                lessonID,
                isFinal: isFinal.toString(),
                stoneIndex,
                screenIndex,
                totalScreens,
            },
        });
    };

    const buildSectionProgressPath = async (
        section: any,
        overallStartingIndex: number,
        lastCompletedIndex: number
    ): Promise<{
        unitIcons: { [unitIndex: number]: ProgressPathProps['icons'] };
        nextOverallIndex: number;
    }> => {
        const unitIcons: { [unitIndex: number]: ProgressPathProps['icons'] } = {};
        const sectionID = section.sectionID;
        const units = await unitEndpoints.getUnitsForSection(sectionID);

        if (units.length === 0)
            return { unitIcons, nextOverallIndex: overallStartingIndex };

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

            const currentUnitIcons: ProgressPathProps['icons'] = [];

            const introStoneIndex = overallIndex;
            currentUnitIcons.push({
                name: u === 0 ? 'playcircleo' : 'infocirlceo',
                status: getStoneStatus(introStoneIndex),
                onPress: () => {
                    const pathToUse = (currentStoneIndex === introStoneIndex && currentScreenPathname)
                        ? currentScreenPathname
                        : (u === 0 ? 'SectionIntroduction' : 'UnitIntroduction');
                    handlePress(
                        pathToUse,
                        sectionID,
                        unitID,
                        '',
                        false,
                        introStoneIndex,
                        currentStoneIndex === introStoneIndex ? currentScreenIndex : 0,
                        u === 0 ? 2 : 1
                    );
                }
            });
            overallIndex++;

            for (let i = 0; i < lessons.length; i++) {
                const lesson = lessons[i];
                const lessonStoneIndex = overallIndex;
                currentUnitIcons.push({
                    name: 'book',
                    status: getStoneStatus(lessonStoneIndex),
                    onPress: () => {
                        const pathToUse = (currentStoneIndex === lessonStoneIndex && currentScreenPathname)
                            ? currentScreenPathname
                            : 'Lesson';
                        handlePress(
                            pathToUse,
                            sectionID,
                            unitID,
                            lesson.lessonID,
                            false,
                            lessonStoneIndex,
                            currentStoneIndex === lessonStoneIndex ? currentScreenIndex : 0,
                            3
                        );
                    }
                });
                overallIndex++;
            }

            const assessmentStoneIndex = overallIndex;
            currentUnitIcons.push({
                name: 'key',
                status: getStoneStatus(assessmentStoneIndex),
                onPress: () => {
                    const pathToUse = (currentStoneIndex === assessmentStoneIndex && currentScreenPathname)
                        ? currentScreenPathname
                        : 'AssessmentIntroduction';
                    handlePress(
                        pathToUse,
                        sectionID,
                        unitID,
                        '',
                        false,
                        assessmentStoneIndex,
                        currentStoneIndex === assessmentStoneIndex ? currentScreenIndex : 0,
                        5
                    );
                }
            });
            overallIndex++;

            unitIcons[u] = currentUnitIcons;
        }

        const finalStoneIndex = overallIndex;
        unitIcons[units.length] = [
            {
                name: 'staro',
                status: getStoneStatus(finalStoneIndex),
                onPress: () => {
                    const pathToUse = (currentStoneIndex === finalStoneIndex && currentScreenPathname)
                        ? currentScreenPathname
                        : 'AssessmentIntroduction';
                    handlePress(
                        pathToUse,
                        sectionID,
                        '',
                        '',
                        true,
                        finalStoneIndex,
                        currentStoneIndex === finalStoneIndex ? currentScreenIndex : 0,
                        5
                    );
                }
            },
        ];
        overallIndex++;

        return { unitIcons, nextOverallIndex: overallIndex };
    };

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                const progressData = await userStoneProgressEndpoints.getUserStoneProgress(currentUser.sub);
                setCurrentStoneIndex(progressData?.current_stone_index ?? null);
                setCurrentScreenIndex(progressData?.current_screen_index ?? 0);
                setCurrentScreenPathname(progressData?.current_screen_pathname ?? null);

                const sectionList = await sectionEndpoints.getAllSectionDetails();
                setSections(sectionList);

                const newIconsData: { [key: number]: { [key: number]: ProgressPathProps['icons'] } } = {};
                let overallStartingIndex = 0;

                for (let i = 0; i < sectionList.length; i++) {
                    const section = sectionList[i];
                    const { unitIcons, nextOverallIndex } = await buildSectionProgressPath(
                        section,
                        overallStartingIndex,
                        progressData?.last_completed_stone_index ?? -1
                    );
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
                                    ref={(el) => {
                                        unitRefs.current[key] = el;
                                    }}
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
