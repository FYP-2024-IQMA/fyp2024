import {StyleSheet, Text, View} from 'react-native';
import SectionCard from '@/components/SectionCard';
import React, {useState, useLayoutEffect, useEffect} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import {CustomButton} from '@/components/CustomButton';
import ProgressBar from '@/components/ProgressBar';
import {useNavigation} from '@react-navigation/native';
import {OverviewCard} from '@/components/OverviewCard';
import {formatSection} from '@/helpers/formatSectionID';
import {formatUnit} from '@/helpers/formatUnitID';
import {router, useLocalSearchParams} from 'expo-router';
import * as unitEndpoints from '@/helpers/unitEndpoints';
import * as lessonEndpoints from '@/helpers/lessonEndpoints';
import {LoadingIndicator} from '@/components/LoadingIndicator';

// where things show up
export default function Lesson() {
    const navigation = useNavigation();
    const {sectionID, unitID, lessonID, currentLessonIdx, totalLesson, currentUnit, totalUnits, currentProgress, totalProgress} = useLocalSearchParams();
    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [unitNumber, setUnitNumber] = useState<string>('');
    const [unitName, setUnitName] = useState<string>('');
    const [lessonName, setLessonName] = useState<string>('');
    const [videoId, setVideoId] = useState<string>('');
    const [playing, setPlaying] = useState<boolean>(true);
    const [lessonDescription, setLessonDescription] = useState<string | []>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useLayoutEffect(() => {

        const progress = parseInt(currentProgress as string) / parseInt(totalProgress as string);

        navigation.setOptions({
            headerTitle: () => (
                <ProgressBar progress={progress} isQuestionnaire={false} />
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
                currentProgress: (parseInt(currentProgress as string) + 1).toString(),
                totalProgress,
            },
        });
    };

    useEffect(() => {
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
        <View style={styles.container}>
            {isLoading ? (
                <View style={{flexGrow: 1}}>
                    <LoadingIndicator />
                </View>
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
                            <YoutubePlayer
                                height={300}
                                play={playing}
                                onChangeState={onStateChange}
                                videoId={videoId} // YouTube video ID
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
                        onPressHandler={handlePress}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        flex: 1,
    },
    screenTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4143A3',
        marginBottom: 20,
        marginHorizontal: 10,
    },
});
