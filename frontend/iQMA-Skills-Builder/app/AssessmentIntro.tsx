import * as sectionEndpoints from '@/helpers/sectionEndpoints';
import * as unitEndpoints from '@/helpers/unitEndpoints';

import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {router, useLocalSearchParams, useRouter} from 'expo-router';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {CustomButton} from '@/components/CustomButton';
import {OverviewCard} from '@/components/OverviewCard';
import ProgressBar from '@/components/ProgressBar';
import SectionCard from '@/components/SectionCard';
import axios from 'axios';
import {formatSection} from '@/helpers/formatSectionID';
import {formatUnit} from '@/helpers/formatUnitID';
import {useNavigation} from '@react-navigation/native';
import {LoadingIndicator} from '@/components/LoadingIndicator';

export default function AssessmentIntro() {
    const navigation = useNavigation();

    const isFinal: boolean = true;
    const sectionID = 'SEC0001';
    const unitID = 'UNIT0001';
    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [unitNumber, setUnitNumber] = useState<string>('');
    const [seconds, setSeconds] = useState<number>(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [introName, setIntroName] = useState<string>('');
    const [introDetails, setIntroDetails] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const startTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        timerRef.current = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
    };

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    useEffect(() => {
        startTimer();
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <ProgressBar progress={0.25} isQuestionnaire={false} />
            ),
        });
    }, [navigation]);

    useEffect(() => {
        if (isFinal) {
            (async () => {
                try {
                    const sectionDetails =
                        await sectionEndpoints.getSectionDetails(
                            sectionID as string
                        );
                    setIntroName(sectionDetails.sectionName);
                    setIntroDetails(sectionDetails.finalAssessmentIntro);
                } catch (error) {
                    console.error('Error fetching section details:', error);
                } finally {
                    setIsLoading(false);
                }
            })();
        } else {
            (async () => {
                try {
                    const sectionDetails = await unitEndpoints.getUnitDetails(
                        sectionID as string,
                        unitID as string
                    );
                    setIntroName(sectionDetails.unitName);
                    setIntroDetails(sectionDetails.assessmentIntro);
                } catch (error) {
                    console.error('Error fetching unit details:', error);
                } finally {
                    setIsLoading(false);
                }
            })();
        }
        setSectionNumber(formatSection(sectionID as string));
        setUnitNumber(formatUnit(unitID as string));
    }, [sectionID, unitID]);

    const handlePress = async () => {
        router.push({
            pathname: 'Lesson',
            params: {sectionID: sectionID, unitID: unitID, lessonID: '1a'},
            // params: {sectionID: sectionID, unitID: unitID, lessonID: lessonID},
        });
        stopTimer();
        const userID = await AsyncStorage.getItem('userID');
        try {
            const response = await axios.post(
                `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/clickstream/sendMessage`,
                {
                    userID: userID,
                    eventType: 'timeTaken',
                    event: `unitID ${unitID}`,
                    timestamp: new Date().toISOString(),
                    time: `${seconds}`,
                }
            );
        } catch (e) {
            console.error(e);
        }
        setSeconds(0);
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
                            title={
                                isFinal
                                    ? `SECTION ${sectionNumber}`
                                    : `SECTION ${sectionNumber}, UNIT ${unitNumber}`
                            }
                            subtitle={introName}
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
                            {isFinal
                                ? `Section ${sectionNumber}: Assessment`
                                : `Unit ${unitNumber}: Assessment`}
                        </Text>

                        {!isFinal ? (
                            introDetails.length > 0 ? (
                                introDetails.map((details, index) => (
                                    <OverviewCard key={index} text={details} />
                                ))
                            ) : (
                                <OverviewCard
                                    isError={true}
                                    text="Description is not available. Please check with your administrator."
                                />
                            )
                        ) : introDetails.length > 0 ? (
                            <OverviewCard
                                text={introDetails}
                                isScenario={true}
                            />
                        ) : (
                            <OverviewCard
                                isError={true}
                                text="Description is not available. Please check with your administrator."
                            />
                        )}

                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'row-reverse',
                            }}
                        >
                            <Image
                                source={
                                    isFinal
                                        ? require('@/assets/images/happycloseeye.png')
                                        : require('@/assets/images/neutral.png')
                                }
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <CustomButton
                            label="continue"
                            backgroundColor="white"
                            onPressHandler={handlePress}
                        />
                    </View>
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
});
