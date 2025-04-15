// import React, {
//     useEffect,
//     useRef,
//     useState,
//     useContext,
//     useCallback,
// } from 'react';
// import {
//     NativeScrollEvent,
//     NativeSyntheticEvent,
//     Pressable,
//     ScrollView,
//     StyleSheet,
//     TouchableOpacity,
//     View,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {Ionicons} from '@expo/vector-icons';
// import {router, useFocusEffect} from 'expo-router';

// import {AuthContext} from '@/context/AuthContext';
// import * as sectionEndpoints from '@/helpers/sectionEndpoints';
// import * as unitEndpoints from '@/helpers/unitEndpoints';
// import * as lessonEndpoints from '@/helpers/lessonEndpoints';
// import * as userStoneProgressEndpoints from '@/helpers/userStoneProgressEndpoints';

// import {Colors} from '@/constants/Colors';
// import {globalStyles} from '@/constants/styles';

// import TopStats from '@/components/TopStats';
// import SectionCard from '@/components/SectionCard';
// import ProgressPath, {ProgressPathProps} from '@/components/ProgressPath';
// import FeedbackComponent from '@/components/Feedback';
// import {LoadingIndicator} from '@/components/LoadingIndicator';
// import { StatusBar } from 'react-native';

// const HomeScreen: React.FC = () => {
//     const {currentUser} = useContext(AuthContext);

//     const [loading, setLoading] = useState(true);
//     const [sections, setSections] = useState<any[]>([]);
//     const [iconsData, setIconsData] = useState<{
//         [sectionIndex: number]: {
//             [unitIndex: number]: ProgressPathProps['icons'];
//         };
//     }>({});

//     const [showButton, setShowButton] = useState(false);

//     const [currentStoneIndex, setCurrentStoneIndex] = useState<number>(0);
//     const [currentScreenIndex, setCurrentScreenIndex] = useState<number>(0);
//     const [currentScreenPathname, setCurrentScreenPathname] = useState<
//         string | null
//     >(null);

//     const [completedStones, setCompletedStones] = useState<number>(0);
//     const [totalStones, setTotalStones] = useState<number>(0);

//     const scrollViewRef = useRef<ScrollView>(null);

//     const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//         setShowButton(event.nativeEvent.contentOffset.y > 0);
//     };

//     const onScrollToTop = () => {
//         scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: true});
//     };

//     const handlePress = (
//         pathName: string,
//         sectionID: string,
//         unitID: string,
//         lessonID: string,
//         isFinal: boolean,
//         stoneIndex: number,
//         screenIndex: number,
//         totalScreens: number,
//         stoneStatus: 'completed' | 'in-progress' | 'not-started'
//     ) => {
//         const inProgress = stoneStatus === 'in-progress';
//         const finalScreenIndex = inProgress ? screenIndex : 0;

//         router.push({
//             pathname: pathName,
//             params: {
//                 sectionID,
//                 unitID,
//                 lessonID,
//                 isFinal: isFinal.toString(),
//                 stoneIndex,
//                 screenIndex: finalScreenIndex,
//                 totalScreens,
//                 inProgress: inProgress.toString(),
//             },
//         });
//     };

//     const buildSectionProgressPath = async (
//         sectionsWithUnitsAndLessons: any[],
//         lastCompletedIndex: number
//     ) => {
//         let overallIndex = 0;
//         const newIconsData: {
//             [sectionIndex: number]: {
//                 [unitIndex: number]: ProgressPathProps['icons'];
//             };
//         } = {};

//         const getStoneStatus = (
//             stoneIndex: number
//         ): 'completed' | 'in-progress' | 'not-started' => {
//             if (stoneIndex <= lastCompletedIndex) return 'completed';
//             if (stoneIndex === lastCompletedIndex + 1) return 'in-progress';
//             return 'not-started';
//         };

//         for (
//             let sectionIndex = 0;
//             sectionIndex < sectionsWithUnitsAndLessons.length;
//             sectionIndex++
//         ) {
//             const section = sectionsWithUnitsAndLessons[sectionIndex];
//             const sectionIcons: {
//                 [unitIndex: number]: ProgressPathProps['icons'];
//             } = {};

//             for (
//                 let unitIndex = 0;
//                 unitIndex < section.units.length;
//                 unitIndex++
//             ) {
//                 const unit = section.units[unitIndex];
//                 const lessons = unit.lessons;
//                 const currentUnitIcons: ProgressPathProps['icons'] = [];

//                 const addStone = (
//                     stoneType: string,
//                     stoneIndex: number,
//                     lessonID: string = '',
//                     totalScreens: number = 1
//                 ) => {
//                     const stoneStatus = getStoneStatus(stoneIndex);

//                     const pathToUse =
//                         currentStoneIndex === stoneIndex &&
//                         currentScreenPathname
//                             ? currentScreenPathname
//                             : stoneType;

//                     const resolvedScreenIndex =
//                         stoneStatus === 'in-progress' ? currentScreenIndex : 0;

//                     // const circularProgress = (stoneStatus === 'in-progress' && stoneIndex === currentStoneIndex)
//                     //   ? Math.min((currentScreenIndex+1 / totalScreens) * 100, 100)
//                     //   : undefined;

//                     let rawProgress = (currentScreenIndex / totalScreens) * 100;
//                     if (rawProgress >= 100) {
//                         rawProgress = 80;
//                     }

//                     const circularProgress =
//                         stoneStatus === 'in-progress' &&
//                         stoneIndex === currentStoneIndex
//                             ? rawProgress
//                             : undefined;

//                     currentUnitIcons.push({
//                         name:
//                             stoneType === 'Lesson'
//                                 ? 'book'
//                                 : stoneType === 'AssessmentIntroduction'
//                                 ? 'form'
//                                 : 'playcircleo',
//                         status: stoneStatus,
//                         onPress: () => {
//                             handlePress(
//                                 pathToUse,
//                                 section.sectionID,
//                                 unit.unitID,
//                                 lessonID,
//                                 false,
//                                 stoneIndex,
//                                 resolvedScreenIndex,
//                                 totalScreens,
//                                 stoneStatus
//                             );
//                         },
//                         circularProgress: circularProgress,
//                         resolvedScreenIndex: resolvedScreenIndex,
//                     });
//                 };

//                 const introStoneIndex = overallIndex;
//                 addStone(
//                     unitIndex === 0
//                         ? 'SectionIntroduction'
//                         : 'UnitIntroduction',
//                     introStoneIndex,
//                     '',
//                     unitIndex === 0 ? 2 : 1
//                 );
//                 overallIndex++;

//                 for (let lesson of lessons) {
//                     const lessonStoneIndex = overallIndex;
//                     addStone('Lesson', lessonStoneIndex, lesson.lessonID, 3);
//                     overallIndex++;
//                 }

//                 const assessmentStoneIndex = overallIndex;
//                 addStone('AssessmentIntroduction', assessmentStoneIndex, '', 5);
//                 overallIndex++;

//                 sectionIcons[unitIndex] = currentUnitIcons;
//             }

//             newIconsData[sectionIndex] = sectionIcons;
//         }

//         return {newIconsData, overallStoneCount: overallIndex};
//     };

//     const fetchProgress = async () => {
//         const progressData =
//             await userStoneProgressEndpoints.getUserStoneProgress(
//                 currentUser.sub
//             );

//         setCurrentStoneIndex(progressData?.current_stone_index ?? 0);
//         setCurrentScreenIndex(progressData?.current_screen_index ?? 0);
//         setCurrentScreenPathname(progressData?.current_screen_pathname ?? null);

//         const sectionsWithUnitsAndLessons = await Promise.all(
//             sections.map(async (section) => {
//                 const units = await unitEndpoints.getUnitsForSection(
//                     section.sectionID
//                 );
//                 const unitsWithLessons = await Promise.all(
//                     units.map(async (unit: any) => {
//                         const lessons = await lessonEndpoints.getAllLesson(
//                             section.sectionID,
//                             unit.unitID
//                         );
//                         return {...unit, lessons};
//                     })
//                 );
//                 return {...section, units: unitsWithLessons};
//             })
//         );

//         const {newIconsData} = await buildSectionProgressPath(
//             sectionsWithUnitsAndLessons,
//             progressData?.last_completed_stone_index ?? -1
//         );

//         setIconsData(newIconsData);
//     };

//     useEffect(() => {
//         (async () => {
//             try {
//                 setLoading(true);

//                 const [progressData, sectionList] = await Promise.all([
//                     userStoneProgressEndpoints.getUserStoneProgress(
//                         currentUser.sub
//                     ),
//                     sectionEndpoints.getAllSectionDetails(),
//                 ]);

//                 setCurrentStoneIndex(progressData?.current_stone_index ?? 0);
//                 setCurrentScreenIndex(progressData?.current_screen_index ?? 0);
//                 setCurrentScreenPathname(
//                     progressData?.current_screen_pathname ?? null
//                 );

//                 setSections(sectionList);

//                 const sectionsWithUnitsAndLessons = await Promise.all(
//                     sectionList.map(async (section) => {
//                         const units = await unitEndpoints.getUnitsForSection(
//                             section.sectionID
//                         );
//                         const unitsWithLessons = await Promise.all(
//                             units.map(async (unit: any) => {
//                                 const lessons =
//                                     await lessonEndpoints.getAllLesson(
//                                         section.sectionID,
//                                         unit.unitID
//                                     );
//                                 return {...unit, lessons};
//                             })
//                         );
//                         return {...section, units: unitsWithLessons};
//                     })
//                 );

//                 const {newIconsData, overallStoneCount} =
//                     await buildSectionProgressPath(
//                         sectionsWithUnitsAndLessons,
//                         progressData?.last_completed_stone_index ?? -1
//                     );

//                 setIconsData(newIconsData);
//                 setTotalStones(overallStoneCount);
//                 setCompletedStones(
//                     (progressData?.last_completed_stone_index ?? -1) + 1
//                 );
//             } catch (error) {
//                 console.error('Error loading data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         })();
//     }, []);

//     useFocusEffect(
//         useCallback(() => {
//             if (sections.length > 0) {
//                 fetchProgress();
//             }
//         }, [sections, currentUser.sub])
//     );

//     if (loading) return <LoadingIndicator />;

//     return (
//         <SafeAreaView style={globalStyles.container}>
//             <ScrollView
//                 contentContainerStyle={styles.container}
//                 onScroll={onScroll}
//                 scrollEventThrottle={16}
//                 ref={scrollViewRef}
//             >
//                 <TopStats
//                     circularProgress={(completedStones / totalStones) * 100}
//                 />

//                 {sections.map((section, sectionIndex) => (
//                     <View key={sectionIndex}>
//                         {Object.entries(iconsData[sectionIndex] || {}).map(
//                             ([unitIndex, unitIcons]) => (
//                                 <View
//                                     key={`${sectionIndex}-${unitIndex}`}
//                                     style={{marginBottom: 20}}
//                                 >
//                                     <SectionCard
//                                         title={`Section ${
//                                             sectionIndex + 1
//                                         }, Unit ${parseInt(unitIndex) + 1}`}
//                                         subtitle={section.sectionName}
//                                     />
//                                     <ProgressPath icons={unitIcons} />
//                                 </View>
//                             )
//                         )}
//                     </View>
//                 ))}
//             </ScrollView>

//             {showButton && (
//                 <Pressable
//                     // style={styles.floatingButton}
//                     style={({pressed}) => [
//                         styles.floatingButton,
//                         pressed && {transform: [{scale: 0.96}]},
//                     ]}
//                     onPress={onScrollToTop}
//                 >
//                     <Ionicons name="arrow-up" size={24} color="white" />
//                 </Pressable>
//             )}

//             <FeedbackComponent userID={currentUser.sub} />
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {padding: 20},
//     floatingButton: {
//         position: 'absolute',
//         bottom: 20,
//         right: 20,
//         backgroundColor: Colors.default.purple100,
//         borderRadius: 10,
//         width: 50,
//         height: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: 1,
//         elevation: 4
//     },
// });

// export default HomeScreen;


import React, {
    useEffect,
    useRef,
    useState,
    useContext,
    useCallback,
} from 'react';
import {
    NativeScrollEvent,
    NativeSyntheticEvent,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import {router, useFocusEffect} from 'expo-router';

import {AuthContext} from '@/context/AuthContext';
import * as sectionEndpoints from '@/helpers/sectionEndpoints';
import * as unitEndpoints from '@/helpers/unitEndpoints';
import * as lessonEndpoints from '@/helpers/lessonEndpoints';
import * as userStoneProgressEndpoints from '@/helpers/userStoneProgressEndpoints';

import {Colors} from '@/constants/Colors';
import {globalStyles} from '@/constants/styles';

import TopStats from '@/components/TopStats';
import SectionCard from '@/components/SectionCard';
import ProgressPath, {ProgressPathProps} from '@/components/ProgressPath';
import FeedbackComponent from '@/components/Feedback';
import {LoadingIndicator} from '@/components/LoadingIndicator';

const HomeScreen: React.FC = () => {
    const {currentUser} = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [sections, setSections] = useState<any[]>([]);
    const [iconsData, setIconsData] = useState<{
        [sectionIndex: number]: {
            [unitIndex: number]: ProgressPathProps['icons'];
        };
    }>({});

    const [showButton, setShowButton] = useState(false);

    const [currentStoneIndex, setCurrentStoneIndex] = useState<number>(0);
    const [currentScreenIndex, setCurrentScreenIndex] = useState<number>(0);
    const [currentScreenPathname, setCurrentScreenPathname] = useState<string | null>(null);

    const [completedStones, setCompletedStones] = useState<number>(0);
    const [totalStones, setTotalStones] = useState<number>(0);

    const scrollViewRef = useRef<ScrollView>(null);

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        setShowButton(event.nativeEvent.contentOffset.y > 0);
    };

    const onScrollToTop = () => {
        scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: true});
    };

    const handlePress = (
        pathName: string,
        sectionID: string,
        unitID: string,
        lessonID: string,
        isFinal: boolean,
        stoneIndex: number,
        screenIndex: number,
        totalScreens: number,
        stoneStatus: 'completed' | 'in-progress' | 'not-started'
    ) => {
        const inProgress = stoneStatus === 'in-progress';
        const finalScreenIndex = inProgress ? screenIndex : 0;

        router.push({
            pathname: pathName,
            params: {
                sectionID,
                unitID,
                lessonID,
                isFinal: isFinal.toString(),
                stoneIndex,
                screenIndex: finalScreenIndex,
                totalScreens,
                inProgress: inProgress.toString(),
            },
        });
    };

    const buildSectionProgressPath = async (
        sectionsWithUnitsAndLessons: any[],
        lastCompletedIndex: number
    ) => {
        let overallIndex = 0;
        const newIconsData: {
            [sectionIndex: number]: {
                [unitIndex: number]: ProgressPathProps['icons'];
            };
        } = {};

        const getStoneStatus = (stoneIndex: number): 'completed' | 'in-progress' | 'not-started' => {
            if (stoneIndex <= lastCompletedIndex) return 'completed';
            if (stoneIndex === lastCompletedIndex + 1) return 'in-progress';
            return 'not-started';
        };

        for (let sectionIndex = 0; sectionIndex < sectionsWithUnitsAndLessons.length; sectionIndex++) {
            const section = sectionsWithUnitsAndLessons[sectionIndex];
            const sectionIcons: {
                [unitIndex: number]: ProgressPathProps['icons'];
            } = {};

            for (let unitIndex = 0; unitIndex < section.units.length; unitIndex++) {
                const unit = section.units[unitIndex];
                const lessons = unit.lessons;
                const currentUnitIcons: ProgressPathProps['icons'] = [];

                const addStone = (
                    stoneType: string,
                    stoneIndex: number,
                    lessonID: string = '',
                    totalScreens: number = 1
                ) => {
                    const stoneStatus = getStoneStatus(stoneIndex);

                    const pathToUse =
                        currentStoneIndex === stoneIndex && currentScreenPathname
                            ? currentScreenPathname
                            : stoneType;

                    const resolvedScreenIndex =
                        stoneStatus === 'in-progress' ? currentScreenIndex : 0;

                    let rawProgress = (currentScreenIndex / totalScreens) * 100;
                    if (rawProgress >= 100) {
                        rawProgress = 80;
                    }

                    const circularProgress =
                        stoneStatus === 'in-progress' && stoneIndex === currentStoneIndex
                            ? rawProgress
                            : undefined;

                    currentUnitIcons.push({
                        name:
                            stoneType === 'Lesson'
                                ? 'book'
                                : stoneType === 'AssessmentIntroduction'
                                ? 'form'
                                : 'playcircleo',
                        status: stoneStatus,
                        onPress: () => {
                            handlePress(
                                pathToUse,
                                section.sectionID,
                                unit.unitID,
                                lessonID,
                                false,
                                stoneIndex,
                                resolvedScreenIndex,
                                totalScreens,
                                stoneStatus
                            );
                        },
                        circularProgress: circularProgress,
                        resolvedScreenIndex: resolvedScreenIndex,
                    });
                };

                const introStoneIndex = overallIndex;
                addStone(
                    unitIndex === 0
                        ? 'SectionIntroduction'
                        : 'UnitIntroduction',
                    introStoneIndex,
                    '',
                    unitIndex === 0 ? 2 : 1
                );
                overallIndex++;

                for (let lesson of lessons) {
                    const lessonStoneIndex = overallIndex;
                    addStone('Lesson', lessonStoneIndex, lesson.lessonID, 3);
                    overallIndex++;
                }

                const assessmentStoneIndex = overallIndex;
                addStone('AssessmentIntroduction', assessmentStoneIndex, '', 5);
                overallIndex++;

                sectionIcons[unitIndex] = currentUnitIcons;
            }

            newIconsData[sectionIndex] = sectionIcons;
        }

        return {newIconsData, overallStoneCount: overallIndex};
    };

    const fetchProgress = async () => {
        const progressData = await userStoneProgressEndpoints.getUserStoneProgress(currentUser.sub);

        setCurrentStoneIndex(progressData?.current_stone_index ?? 0);
        setCurrentScreenIndex(progressData?.current_screen_index ?? 0);
        setCurrentScreenPathname(progressData?.current_screen_pathname ?? null);

        const sectionsWithUnitsAndLessons = await Promise.all(
            sections.map(async (section) => {
                const units = await unitEndpoints.getUnitsForSection(section.sectionID);
                const unitsWithLessons = await Promise.all(
                    units.map(async (unit: any) => {
                        const lessons = await lessonEndpoints.getAllLesson(
                            section.sectionID,
                            unit.unitID
                        );
                        return {...unit, lessons};
                    })
                );
                return {...section, units: unitsWithLessons};
            })
        );

        const {newIconsData} = await buildSectionProgressPath(
            sectionsWithUnitsAndLessons,
            progressData?.last_completed_stone_index ?? -1
        );

        setIconsData(newIconsData);
    };

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                const [progressData, sectionList] = await Promise.all([
                    userStoneProgressEndpoints.getUserStoneProgress(currentUser.sub),
                    sectionEndpoints.getAllSectionDetails(),
                ]);

                setCurrentStoneIndex(progressData?.current_stone_index ?? 0);
                setCurrentScreenIndex(progressData?.current_screen_index ?? 0);
                setCurrentScreenPathname(progressData?.current_screen_pathname ?? null);

                setSections(sectionList);

                const sectionsWithUnitsAndLessons = await Promise.all(
                    sectionList.map(async (section) => {
                        const units = await unitEndpoints.getUnitsForSection(section.sectionID);
                        const unitsWithLessons = await Promise.all(
                            units.map(async (unit: any) => {
                                const lessons = await lessonEndpoints.getAllLesson(
                                    section.sectionID,
                                    unit.unitID
                                );
                                return {...unit, lessons};
                            })
                        );
                        return {...section, units: unitsWithLessons};
                    })
                );

                const {newIconsData, overallStoneCount} =
                    await buildSectionProgressPath(
                        sectionsWithUnitsAndLessons,
                        progressData?.last_completed_stone_index ?? -1
                    );

                setIconsData(newIconsData);
                setTotalStones(overallStoneCount);
                setCompletedStones(
                    (progressData?.last_completed_stone_index ?? -1) + 1
                );
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (sections.length > 0) {
                fetchProgress();
            }
        }, [sections, currentUser.sub])
    );

    // AUTOSCROLL TO CURRENT STONE ===
    useEffect(() => {
        if (!loading && scrollViewRef.current) {
            const estimatedStoneHeight = 100; //
            const paddingTop = 200; // TopStats and margins
            const scrollPosition = currentStoneIndex * estimatedStoneHeight - paddingTop;

            scrollViewRef.current.scrollTo({
                y: Math.max(scrollPosition, 0),
                animated: true,
            });
        }
    }, [loading, currentStoneIndex]);
    // ================================

    if (loading) return <LoadingIndicator />;

    return (
        <SafeAreaView style={globalStyles.container}>

<View style={styles.header}>
    <TopStats circularProgress={(completedStones / totalStones) * 100} />
  </View>

            <ScrollView
                contentContainerStyle={styles.container}
                onScroll={onScroll}
                scrollEventThrottle={16}
                ref={scrollViewRef}
            >
                {/* <TopStats
                    circularProgress={(completedStones / totalStones) * 100}
                /> */}

                {sections.map((section, sectionIndex) => (
                    <View key={sectionIndex}>
                        {Object.entries(iconsData[sectionIndex] || {}).map(
                            ([unitIndex, unitIcons]) => (
                                <View
                                    key={`${sectionIndex}-${unitIndex}`}
                                    style={{marginBottom: 20}}
                                >
                                    <SectionCard
                                        title={`Section ${sectionIndex + 1}, Unit ${parseInt(unitIndex) + 1}`}
                                        subtitle={section.sectionName}
                                    />
                                    <ProgressPath icons={unitIcons} />
                                </View>
                            )
                        )}
                    </View>
                ))}
            </ScrollView>

            {showButton && (
                <Pressable
                    style={({pressed}) => [
                        styles.floatingButton,
                        pressed && {transform: [{scale: 0.96}]},
                    ]}
                    onPress={onScrollToTop}
                >
                    <Ionicons name="arrow-up" size={24} color="white" />
                </Pressable>
            )}

            <FeedbackComponent userID={currentUser.sub} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {padding: 20},
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
        elevation: 4,
    },
    header: {
        backgroundColor: Colors.light.background,
        paddingHorizontal: 20,
        paddingBottom: 0,
        paddingTop: 20,
        zIndex: 2,  // float
        elevation: 5
      },
});

export default HomeScreen;

