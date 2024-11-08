import * as lessonEndpoints from '@/helpers/lessonEndpoints';
import * as unitEndpoints from '@/helpers/unitEndpoints';

import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import {router, useFocusEffect, useLocalSearchParams} from 'expo-router';

import {Colors} from '@/constants/Colors';
import {CustomButton} from '@/components/CustomButton';
import {LoadingIndicator} from '@/components/LoadingIndicator';
import {OverviewCard} from '@/components/OverviewCard';
import ProgressBar from '@/components/ProgressBar';
import SectionCard from '@/components/SectionCard';
import {formatSection} from '@/helpers/formatSectionID';
import {formatUnit} from '@/helpers/formatUnitID';
import {useNavigation} from '@react-navigation/native';
import VideoPlayer from '@/components/VideoPlayer';
import { useTimer } from '@/helpers/useTimer';
import {Ionicons} from '@expo/vector-icons';


// where things show up
export default function Lesson() {
    const navigation = useNavigation();
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
    const [videoId, setVideoId] = useState<string>('');
    const [playing, setPlaying] = useState<boolean>(true);
    const [lessonDescription, setLessonDescription] = useState<string | []>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { startTimer, stopTimer } = useTimer(sectionID as string, 'Lesson', unitID as string, lessonID as string);
    const [isScroll, setIsScroll] = useState(false);
    const screenHeight = Dimensions.get('window').height;

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

    const handlePress = () => {
        setPlaying(false);
        router.push({
            pathname: 'VideoQuiz',
            params: {
                sectionID,
                unitID,
                lessonID,
                currentLessonIdx,
                totalLesson,
                currentUnit,
                totalUnits,
                currentProgress: (
                    parseInt(currentProgress as string) + 1
                ).toString(),
                totalProgress,
            },
        });
        console.log("ISPLAYING: " + playing)
        stopTimer();
    };

    useFocusEffect(
        useCallback(() => {
            setPlaying(true);
            return () => {
                setPlaying(false);
            };
        }, [])
    );

    useEffect(() => {
        startTimer();
        if (sectionID && unitID && lessonID) {
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

                    setLessonDescription(lessonDetails.lessonDescription);
                    setLessonName(lessonDetails.lessonName);
                    setVideoId(lessonDetails.lessonURL);
                    setUnitName(unitDetails.unitName);

                    setSectionNumber(formatSection(sectionID as string));
                    setUnitNumber(formatUnit(unitID as string));
                } catch (error) {
                    console.error('Error fetching Lesson details:', error);
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [sectionID, unitID]);

    const onStateChange = (state: string) => {
        if (state === 'ended' || state === 'paused') {
            setPlaying(false);
        }
        if (state === 'playing') {
            setPlaying(true);
        }
    };

    return (
        <ScrollView
            // contentContainerStyle={{flexGrow: 1}}
            // style={styles.container}
            // onContentSizeChange={(width, height) => {
            //     setIsScroll(height + 100 > screenHeight);
            // }}
            contentContainerStyle={{
                flexGrow: 1,
                padding: 20,
                backgroundColor: Colors.light.background
            }}
        >
            {isLoading ? (
                <LoadingIndicator />
            ) : (
                <>
                    <View style={{flexGrow: 1}}>
                        <SectionCard
                            title={`SECTION ${sectionNumber}, UNIT ${unitNumber}`}
                            subtitle={unitName}
                        />
                        <Text style={styles.screenTitle}>{lessonName}</Text>

                        {lessonDescription ? (
                            <OverviewCard
                                text={lessonDescription!}
                            ></OverviewCard>
                        ) : (
                            <OverviewCard
                                // isError={true}
                                text="Lesson Description is not available. Please check with your administrator."
                            />
                        )}
                        {videoId ? (
                            <VideoPlayer
                                videoUrl={videoId}
                                playing={playing}
                                onStateChange={onStateChange}
                            />
                        ) : (
                            <OverviewCard
                                isError={true}
                                text="Video is not available. Please check with your administrator."
                            />
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
