import * as unitEndpoints from '@/helpers/unitEndpoints';

import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {router, useLocalSearchParams, useRouter} from 'expo-router';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '@/constants/Colors';
import {CustomButton} from '@/components/CustomButton';
import {LoadingIndicator} from '@/components/LoadingIndicator';
import {OverviewCard} from '@/components/OverviewCard';
import ProgressBar from '@/components/ProgressBar';
import SectionCard from '@/components/SectionCard';
import axios from 'axios';
import {formatSection} from '@/helpers/formatSectionID';
import {formatUnit} from '@/helpers/formatUnitID';
import {useNavigation} from '@react-navigation/native';
import {useTimer} from '@/helpers/useTimer';
import {Ionicons} from '@expo/vector-icons';

// where things show up
export default function UnitIntroduction() {
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
    const [unitDescription, setUnitDescription] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {startTimer, stopTimer} = useTimer(
        sectionID as string,
        'Introduction',
        unitID as string
    );

    useLayoutEffect(() => {
        const progress =
            parseInt(currentProgress as string) /
            parseInt(totalProgress as string);

        navigation.setOptions({
            headerTitleAlign: 'center',
            headerTitle: () => (
                <ProgressBar progress={progress} isQuestionnaire={false} />
            ),
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {
                        router.replace('Home');
                    }}
                >
                    <Ionicons name="home" size={24} color="black" />
                </TouchableOpacity>
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
                    setUnitDescription(unitDetails.unitDescription);
                    setUnitName(unitDetails.unitName);

                    setSectionNumber(formatSection(sectionID as string));
                    setUnitNumber(formatUnit(unitID as string));
                } catch (error) {
                    console.error('Error fetching unit details:', error);
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [sectionID, unitID]);

    const handlePress = async () => {
        // router.push('Lesson');
        router.push({
            pathname: 'Lesson',
            // params: {sectionID: sectionID, unitID: unitID, lessonID: '1a'},
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
        stopTimer();
    };

    return (
        <ScrollView
            // contentContainerStyle={{flexGrow: 1}}
            // style={styles.container}
            contentContainerStyle={{
                flexGrow: 1,
                padding: 20,
                backgroundColor: Colors.light.background
            }}
        >
            {isLoading ? (
                <View style={{flexGrow: 1}}>
                    <LoadingIndicator />
                </View>
            ) : (
                <>
                    <View style={styles.insideContainer}>
                        <SectionCard
                            title={`SECTION ${sectionNumber}, UNIT ${unitNumber}`}
                            subtitle={unitName}
                        />
                        <Text style={styles.screenTitle}>
                            Unit {unitNumber}: Introduction
                        </Text>

                        {unitDescription.length > 0 ? (
                            unitDescription.map((description, index) => (
                                <OverviewCard key={index} text={description} />
                            ))
                        ) : (
                            <OverviewCard
                                // isError={true}
                                text="Unit description is not available. Please check with your administrator."
                            />
                        )}

                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'row-reverse',
                                marginBottom: 20
                            }}
                        >
                            <Image
                                style={{}}
                                source={require('@/assets/images/neutral.png')}
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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.background,
        padding: 20,
        flex: 1,
    },
    insideContainer: {
        flexGrow: 1,
        // margin: 20,
    },
    screenTitle: {
        fontSize: Colors.lessonName.fontSize,
        fontWeight: 'bold',
        color: Colors.header.color,
        marginBottom: 20,
        marginHorizontal: 10,
    },
});
