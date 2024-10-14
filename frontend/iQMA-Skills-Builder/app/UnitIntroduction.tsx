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
import {LoadingIndicator} from '@/components/LoadingIndicator';
import { useTimer } from '@/helpers/useTimer';

// where things show up
export default function UnitIntroduction() {
    const navigation = useNavigation();

    const {sectionID, unitID, lessonID, currentLessonIdx, totalLesson, currentUnit, totalUnits, currentProgress, totalProgress} = useLocalSearchParams();
    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [unitNumber, setUnitNumber] = useState<string>('');
    const [unitName, setUnitName] = useState<string>('');
    const [unitDescription, setUnitDescription] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { startTimer, stopTimer } = useTimer(`${sectionID} ${unitID} Introduction`);

    useLayoutEffect(() => {

        const progress = parseInt(currentProgress as string) / parseInt(totalProgress as string);

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
                currentProgress: (parseInt(currentProgress as string) + 1).toString(),
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
