import * as unitEndpoints from '@/helpers/unitEndpoints';

import {Image, StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {router, useLocalSearchParams, useRouter} from 'expo-router';

import {Colors} from '@/constants/Colors';
import {CustomButton} from '@/components/CustomButton';
import {LoadingIndicator} from '@/components/LoadingIndicator';
import {OverviewCard} from '@/components/OverviewCard';
import ProgressBar from '@/components/ProgressBar';
import SectionCard from '@/components/SectionCard';
import {formatSection} from '@/helpers/formatSectionID';
import {formatUnit} from '@/helpers/formatUnitID';
import {useNavigation} from '@react-navigation/native';
import { useTimer } from '@/helpers/useTimer';
import VideoPlayer from '@/components/VideoPlayer';

// where things show up
export default function RealityCheck() {
    const navigation = useNavigation();

    // Use this for Routing
    const {
        sectionID,
        unitID,
        currentUnit,
        totalUnits,
        isFinal,
        currentProgress,
        totalProgress,
    } = useLocalSearchParams();
    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [unitNumber, setUnitNumber] = useState<string>('');
    const [unitName, setUnitName] = useState<string>('');
    const [realityCheckDescription, setRealityCheckDescription] = useState<
        string[]
    >([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { startTimer, stopTimer } = useTimer(sectionID as string, 'Reality Check', unitID as string);
    const [isScroll, setIsScroll] = useState(false);
    const screenHeight = Dimensions.get('window').height;
    const [videoId, setVideoId] = useState<string>('');
    const [playing, setPlaying] = useState<boolean>(true);

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
        startTimer();
        if (sectionID && unitID) {
            (async () => {
                try {
                    const unitDetails = await unitEndpoints.getUnitDetails(
                        sectionID as string,
                        unitID as string
                    );

                    setRealityCheckDescription(unitDetails.realityCheck);
                    setUnitName(unitDetails.unitName);
                    setVideoId(unitDetails.realitycheckURL);
                    setSectionNumber(formatSection(sectionID as string));
                    setUnitNumber(formatUnit(unitID as string));
                } catch (error) {
                    console.error(
                        'Error fetching Unit details in Reality Check:',
                        error
                    );
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

    const handlePress = async () => {
        router.push({
            pathname: 'Assessment',
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
                    <View style={{flexGrow: 1}}>
                        <SectionCard
                            title={`SECTION ${sectionNumber}, UNIT ${unitNumber}`}
                            subtitle={unitName}
                        />
                        <Text style={styles.screenTitle}>
                            Unit {unitNumber}: Reality Check
                        </Text>

                        {realityCheckDescription.length > 0 ? (
                            realityCheckDescription.map(
                                (description, index) => (
                                    <OverviewCard
                                        key={index}
                                        text={description}
                                    />
                                )
                            )
                        ) : (
                            <OverviewCard
                                isError={true}
                                text="Unit description is not available. Please check with your administrator."
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

                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'row-reverse',
                                marginTop: 20,
                            }}
                        >
                            <Image
                                style={{}}
                                source={require('@/assets/images/happycloseeye.png')}
                            ></Image>
                        </View>
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
