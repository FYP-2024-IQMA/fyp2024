import {Image, StyleSheet, Text, View} from 'react-native';
import SectionCard from '@/components/SectionCard';
import React, {useState, useLayoutEffect, useEffect, useRef} from 'react';
import {CustomButton} from '@/components/CustomButton';
import {router, useLocalSearchParams, useRouter} from 'expo-router';
import {useNavigation} from '@react-navigation/native';
import ProgressBar from '@/components/ProgressBar';
import {OverviewCard} from '@/components/OverviewCard';
import {formatSection} from '@/helpers/formatSectionID';
import {formatUnit} from '@/helpers/formatUnitID';
import * as unitEndpoints from '@/helpers/unitEndpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// where things show up
export default function RealityCheck() {
    const navigation = useNavigation();

    const {sectionID, unitID, lessonID} = useLocalSearchParams();
    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [unitNumber, setUnitNumber] = useState<string>('');
    const [unitName, setUnitName] = useState<string>('');
    const [unitDescription, setUnitDescription] = useState<string[]>([]);

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
                const unitDetails = await unitEndpoints.getUnitDetails(
                    sectionID as string,
                    unitID as string
                );

                setUnitDescription(unitDetails.unitDescription);
                setUnitName(unitDetails.unitName);
            })();
            setSectionNumber(formatSection(sectionID as string));
            setUnitNumber(formatUnit(unitID as string));
        }
    }, [sectionID, unitID]);

    const handlePress = async () => {
        // router.push('Lesson');
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
            console.log(response.data);
        } catch (e) {
            console.error(e);
        }
        setSeconds(0);
    };

    return (
        <View style={styles.container}>
            <View style={{flexGrow: 1}}>
                <SectionCard
                    title={`SECTION ${sectionNumber}, UNIT ${unitNumber}`}
                    subtitle={unitName}
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
                    Unit {unitNumber}: Introduction
                </Text>

                {unitDescription.length > 0 ? (
                    unitDescription.map((description, index) => (
                        <OverviewCard key={index} text={description} />
                    ))
                ) : (
                    <OverviewCard
                        isError={true}
                        text="Unit description is not available. Please check with your administrator."
                    />
                )}

                <View style={{width: '100%', flexDirection: 'row-reverse'}}>
                    <Image
                        style={{}}
                        source={require('@/assets/images/neutral.png')}
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
