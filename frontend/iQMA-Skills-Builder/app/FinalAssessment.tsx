import * as sectionEndpoints from '@/helpers/sectionEndpoints';

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
import {useNavigation} from '@react-navigation/native';

export default function FinalAssessment() {
    const navigation = useNavigation();

    const sectionID = 'SEC0001';
    const unitID = 'UNIT0001';
    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [sectionIntro, setSectionIntro] = useState<string[]>([]);
    const [sectionName, setSectionName] = useState<string>('');
    const [seconds, setSeconds] = useState<number>(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

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
        if (sectionID && unitID) {
            (async () => {
                const sectionDetails = await sectionEndpoints.getSectionDetails(
                    sectionID as string
                );
                setSectionName(sectionDetails.sectionName);
                setSectionIntro(sectionDetails.finalAssessmentIntro);
            })();
            setSectionNumber(formatSection(sectionID as string));
        }
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
                    Section {sectionNumber}: Assessment
                </Text>

                {sectionIntro.length > 0 ? (
                    <OverviewCard text={sectionIntro.join('\n\n')} />
                ) : (
                    <OverviewCard
                        isError={true}
                        text="Unit description is not available. Please check with your administrator."
                    />
                )}

                <View style={{width: '100%', flexDirection: 'row-reverse'}}>
                    <Image
                        style={{marginTop: -50}}
                        source={require('@/assets/images/happycloseeye.png')}
                    ></Image>
                </View>
            </View>

            <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                <CustomButton
                    label="continue"
                    backgroundColor="white"
                    onPressHandler={handlePress}
                />
            </View>
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
