import {StyleSheet, Text, View} from 'react-native';
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

// where things show up
export default function SectionIntroduction() {
    const navigation = useNavigation();

    const {sectionID, unitID, lessonID} = useLocalSearchParams();
    // const sectionID = 'SEC0001'; // to be removed
    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [sectionName, setSectionName] = useState<string>('');
    const [videoId, setVideoId] = useState<string>('');
    const [playing, setPlaying] = useState<boolean>(true);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <ProgressBar progress={0.25} isQuestionnaire={false} />
            ),
        });
    }, [navigation]);

    useEffect(() => {
        if (sectionID) {
            (async () => {
                const sectionDetails = await sectionEndpoints.getSectionDetails(
                    sectionID as string
                );

                setVideoId(sectionDetails.introductionURL);
                setSectionName(sectionDetails.sectionName);
            })();
            setSectionNumber(formatSection(sectionID as string));
        }
    }, [sectionID]);

    const handlePress = () => {
        // router.push('UnitIntroduction');
        router.push({
            pathname: 'UnitIntroduction',
            params: {sectionID, unitID, lessonID},
        });
    };

    const onStateChange = (state: string) => {
        if (state === 'ended') {
            setPlaying(false);
        }
        if (state === 'playing') {
            setPlaying(true);
        }
        if (state === 'paused') {
            setPlaying(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{flexGrow: 1}}>
                <SectionCard
                    title={`SECTION ${sectionNumber}`}
                    subtitle={sectionName}
                />
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#4143A3',
                        marginBottom: 20,
                        marginHorizontal: 10,
                    }}
                >
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        flex: 1,
    },
});
