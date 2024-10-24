import * as lessonEndpoints from '@/helpers/lessonEndpoints';
import * as unitEndpoints from '@/helpers/unitEndpoints';


import React, {useEffect, useLayoutEffect, useState,} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import {router, useLocalSearchParams} from 'expo-router';

import {Colors} from '@/constants/Colors';
import {CustomButton} from '@/components/CustomButton';
import {LoadingIndicator} from '@/components/LoadingIndicator';
import { useTimer } from '@/helpers/useTimer';
import {OverviewCard} from '@/components/OverviewCard';
import ProgressBar from '@/components/ProgressBar';
import {formatUnit} from '@/helpers/formatUnitID';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import {AudioPlayer} from '@/components/AudioPlayer';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const formatCheatSheet = (cheatsheet: any) => {
    if (Array.isArray(cheatsheet)) {
        if (cheatsheet.length === 0) {
            return (
                <OverviewCard
                    isError={true}
                    text="Lesson Cheatsheet is not available. Please check with your administrator."
                />
            );
        }
        return cheatsheet.map((item, index) => (
            <OverviewCard key={index} text={item}></OverviewCard>
        ));
    } else {
        if (Object.keys(cheatsheet).length === 0) {
            return (
                <OverviewCard
                    isError={true}
                    text="Lesson Cheatsheet is not available. Please check with your administrator."
                />
            );
        }
        return Object.entries(cheatsheet).map(([title, text], index) => (
            <OverviewCard
                isCheatsheetObject={true}
                key={index}
                title={title}
                text={text as string | string[]}
            ></OverviewCard>
        ));
    }
};

// where things show up
export default function CheatSheet() {
    const navigation = useNavigation();
    const {
        sectionID,
        unitID,
        currentUnit,
        totalUnits,
        isFinal,
        currentProgress,
        totalProgress,
    } = useLocalSearchParams();
    const [lessons, setLessons] = useState<any[]>([]);
    const [unitNumber, setUnitNumber] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { startTimer, stopTimer } = useTimer(sectionID as string, 'Cheat Sheet');
    const [isScroll, setIsScroll] = useState(false);
    const screenHeight = Dimensions.get('window').height;
    const [cheatSheetAudio, setCheatSheetAudio ] = useState<string>('');

    useLayoutEffect(() => {
        const progress =
            parseInt(currentProgress as string) /
            parseInt(totalProgress as string);

        navigation.setOptions({
            headerTitleAlign: "center",
            headerTitle: () => (
                <ProgressBar progress={progress} isQuestionnaire={false} />
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => {router.replace("Home")}}>
                    <Ionicons
                        name="home"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        startTimer();
        if (sectionID && unitID) {
            (async () => {
                try {
                    const lessonDetails = await lessonEndpoints.getAllLesson(
                        sectionID as string,
                        unitID as string
                    );

                    const unitDetails = await unitEndpoints.getUnitDetails(
                        sectionID as string,
                        unitID as string
                    );

                    const processedLessonDetails = lessonDetails
                        .filter(
                            (lesson: any) => !/\.[2-9]\d*/.test(lesson.lessonID)
                        )
                        .map((lesson: any) => ({
                            ...lesson,
                            lessonName: lesson.lessonName.replace('.1', ''),
                        }));

                    setLessons(processedLessonDetails);
                    setUnitNumber(formatUnit(unitID as string));
                    setCheatSheetAudio(unitDetails.cheatSheetAudio)
                } catch (error) {
                    console.error(
                        'Error fetching Lesson details in CheatSheet:',
                        error
                    );
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [sectionID, unitID]);

    const handlePress = () => {
        router.push({
            pathname: 'RealityCheck',
            params: {
                sectionID,
                unitID,
                currentUnit,
                totalUnits,
                isFinal,
                currentProgress: (
                    parseInt(currentProgress as string) + 1
                ).toString(),
                totalProgress,
            },
        });
        stopTimer();
    };

    return (
        <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            style={styles.container}
            onContentSizeChange={(width, height) => {
                setIsScroll(height + 100 > screenHeight);
            }}
        >
            {isLoading ? (
                <LoadingIndicator />
            ) : (
                <>
                    <View style = {{flexGrow: 1}}>
                        <Text style={[styles.title, {marginHorizontal: 10}]}>
                            Unit {unitNumber}: Cheat Sheet
                        </Text>

                        <Text style={styles.audioTitle}>Listen & Learn</Text>

                        <View style={styles.logoContainer}>
                            <View style={styles.audioCircle}>
                                <FontAwesome5
                                    name="headphones"
                                    size={50}
                                    color={Colors.default.purple500}
                                />
                            </View>
                        </View>

                        <AudioPlayer
                            audioUri={cheatSheetAudio}
                        />

                        {lessons.length > 0 ? (
                            lessons.map((lesson, index) => (
                                <View key={index} style={[styles.cheatSheet]}>
                                    <Text style={styles.title}>
                                        {lesson.lessonName}
                                    </Text>
                                    {formatCheatSheet(lesson.lessonCheatSheet)}
                                </View>
                            ))
                        ) : (
                            <OverviewCard
                                text="Lesson Cheatsheets are not available. Please check with your administrator."
                                isError={true}
                            ></OverviewCard>
                        )}
                    </View>

                    <CustomButton
                        label="continue"
                        backgroundColor="white"
                        isScroll={isScroll}
                        onPressHandler={handlePress}
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
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 10,
    },
    audioCircle: {
        backgroundColor: Colors.light.unFilled,
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
    },
    audioTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.header.color,
        marginBottom: 20,
        marginHorizontal: 10,
        textAlign: 'center',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.header.color,
        marginBottom: 20,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 20,
    },
    cheatSheet: {
        borderColor: '#C3B1FF',
        borderRadius: 10,
        borderWidth: 2,
        padding: 10,
        marginBottom: 20,
        marginTop: 20,
        backgroundColor: Colors.light.background,
        // shadow properties
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
});
