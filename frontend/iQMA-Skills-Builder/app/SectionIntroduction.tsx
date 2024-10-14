import {StyleSheet, Text, View, ScrollView} from 'react-native';
import SectionCard from '@/components/SectionCard';
import React, {useState, useLayoutEffect, useEffect} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import {CustomButton} from '@/components/CustomButton';
import {router, useLocalSearchParams} from 'expo-router';
import {useNavigation} from '@react-navigation/native';
import ProgressBar from '@/components/ProgressBar';
import {formatSection} from '@/helpers/formatSectionID';
import {OverviewCard} from '@/components/OverviewCard';
import * as sectionEndpoints from '@/helpers/sectionEndpoints';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import VideoPlayer from '@/components/VideoPlayer';

// where things show up
export default function SectionIntroduction() {
    const navigation = useNavigation();

    const {sectionID, unitID, lessonID, currentLessonIdx, totalLesson, currentUnit, totalUnits, currentProgress, totalProgress} = useLocalSearchParams();
    // const sectionID = 'SEC0001'; // to be removed
    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [sectionName, setSectionName] = useState<string>('');
    const [videoId, setVideoId] = useState<string>('');
    const [playing, setPlaying] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useLayoutEffect(() => {

        const progress = parseInt(currentProgress as string) / parseInt(totalProgress as string);

        navigation.setOptions({
            headerTitle: () => (
                <ProgressBar progress={progress} isQuestionnaire={false} />
            ),
        });
    }, [navigation]);

    useEffect(() => {
        if (sectionID) {
            (async () => {
                try {
                    const sectionDetails =
                        await sectionEndpoints.getSectionDetails(
                            sectionID as string
                        );

                    setVideoId(sectionDetails.introductionURL);
                    setSectionName(sectionDetails.sectionName);

                    setSectionNumber(formatSection(sectionID as string));
                } catch (error) {
                    console.error('Error fetching Lesson details:', error);
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [sectionID]);

    const handlePress = () => {
        setPlaying(false);
        router.push({
            pathname: 'UnitIntroduction',
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
            contentContainerStyle={{flexGrow: 1}}
            style={styles.container}
        >
            {isLoading ? (
                <LoadingIndicator />
            ) : (
                <>
                    <View>
                        <SectionCard
                            title={`SECTION ${sectionNumber}`}
                            subtitle={sectionName}
                        />
                        <Text style={styles.screenTitle}>
                            Section {sectionNumber}: Introduction
                        </Text>
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
        backgroundColor: '#FFFFFF',
        padding: 20,
        // flex: 1,
    },
    screenTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4143A3',
        marginBottom: 20,
        marginHorizontal: 10,
    },
});
