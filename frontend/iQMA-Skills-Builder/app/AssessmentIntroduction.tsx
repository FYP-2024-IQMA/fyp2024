import * as sectionEndpoints from '@/helpers/sectionEndpoints';
import * as unitEndpoints from '@/helpers/unitEndpoints';

import {Image, ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import {
    router,
    useFocusEffect,
    useLocalSearchParams,
    useRouter,
} from 'expo-router';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '@/constants/Colors';
import {CustomButton} from '@/components/CustomButton';
import {LoadingIndicator} from '@/components/LoadingIndicator';
import {OverviewCard} from '@/components/OverviewCard';
import ProgressBar from '@/components/ProgressBar';
import SectionCard from '@/components/SectionCard';
import {formatSection} from '@/helpers/formatSectionID';
import {formatUnit} from '@/helpers/formatUnitID';
import {useNavigation} from '@react-navigation/native';
import {useTimer} from '@/helpers/useTimer';
import {AudioPlayer} from '@/components/AudioPlayer';
import {Ionicons} from '@expo/vector-icons';

export default function AssessmentIntroduction() {
    const navigation = useNavigation();

    // const isFinal: boolean = false;
    // const sectionID = 'SEC0001';
    // const unitID = 'UNIT0001';
    // const currentUnit = "1";
    // const totalUnits = "1"
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
    const [seconds, setSeconds] = useState<number>(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [introName, setIntroName] = useState<string>('');
    const [introDetails, setIntroDetails] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [checkFinal, setCheckFinal] = useState<boolean>(false);
    const {startTimer, stopTimer} = useTimer(
        sectionID as string,
        'Assessment Introduction',
        unitID as string
    );

    useEffect(() => {
        startTimer();
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

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
        if (isFinal === 'true') {
            (async () => {
                try {
                    const sectionDetails =
                        await sectionEndpoints.getSectionDetails(
                            sectionID as string
                        );
                    setIntroName(sectionDetails.sectionName);
                    setIntroDetails(sectionDetails.finalAssessmentIntro);
                    setCheckFinal(true);
                } catch (error) {
                    console.error('Error fetching section details:', error);
                } finally {
                    setIsLoading(false);
                }
            })();
        } else {
            (async () => {
                try {
                    const unitDetails = await unitEndpoints.getUnitDetails(
                        sectionID as string,
                        unitID as string
                    );
                    setIntroName(unitDetails.unitName);
                    setIntroDetails(unitDetails.assessmentIntro);
                } catch (error) {
                    console.error('Error fetching unit details:', error);
                } finally {
                    setIsLoading(false);
                }
            })();
        }
        setSectionNumber(formatSection(sectionID as string));
        setUnitNumber(formatUnit(unitID as string));
    }, [sectionID, unitID, checkFinal]);

    const handlePress = async () => {
        let pathName = 'CheatSheet';

        if (checkFinal) {
            pathName = 'Assessment';
        }
        router.push({
            pathname: pathName,
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
                                checkFinal
                                    ? `SECTION ${sectionNumber}`
                                    : `SECTION ${sectionNumber}, UNIT ${unitNumber}`
                            }
                            subtitle={introName}
                        />
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: Colors.header.color,
                                marginBottom: 20,
                                marginHorizontal: 10,
                            }}
                        >
                            {checkFinal
                                ? `Section ${sectionNumber}: Assessment`
                                : `Unit ${unitNumber}: Assessment`}
                        </Text>

                        {!checkFinal ? (
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
                                    checkFinal
                                        ? require('@/assets/images/happycloseeye.png')
                                        : require('@/assets/images/neutral.png')
                                }
                            />
                        </View>
                        
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
});
