import * as sectionEndpoints from '@/helpers/sectionEndpoints';

import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {router, useLocalSearchParams} from 'expo-router';

import {Colors} from '@/constants/Colors';
import {CustomButton} from '@/components/CustomButton';
import {LoadingIndicator} from '@/components/LoadingIndicator';
import {OverviewCard} from '@/components/OverviewCard';
import ProgressBar from '@/components/ProgressBar';
import SectionCard from '@/components/SectionCard';
import YoutubePlayer from 'react-native-youtube-iframe';
import {formatSection} from '@/helpers/formatSectionID';
import {useNavigation} from '@react-navigation/native';

// where things show up
export default function SectionIntroduction() {
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
    // const sectionID = 'SEC0001'; // to be removed
    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [sectionName, setSectionName] = useState<string>('');
    const [videoId, setVideoId] = useState<string>('');
    const [playing, setPlaying] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useLayoutEffect(() => {
        const progress =
            parseInt(currentProgress as string) /
            parseInt(totalProgress as string);

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
                currentProgress: (
                    parseInt(currentProgress as string) + 1
                ).toString(),
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
        <View style={styles.container}>
            {isLoading ? (
                <View style={{flexGrow: 1}}>
                    <LoadingIndicator />
                </View>
            ) : (
                <>
                    <View style={{flexGrow: 1}}>
                        <SectionCard
                            title={`SECTION ${sectionNumber}`}
                            subtitle={sectionName}
                        />
                        <Text style={styles.screenTitle}>
                            Section {sectionNumber}: Introduction
                        </Text>
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
        backgroundColor: Colors.light.background,
        padding: 20,
        flex: 1,
    },
    screenTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.header.color,
        marginBottom: 20,
        marginHorizontal: 10,
    },
});
