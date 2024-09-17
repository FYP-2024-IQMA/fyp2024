import * as lessonEndpoints from '@/helpers/lessonEndpoints';
import * as sectionEndpoints from '@/helpers/sectionEndpoints';
import * as unitEndpoints from '@/helpers/unitEndpoints';

import React, {useEffect, useLayoutEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {router, useLocalSearchParams} from 'expo-router';

import {CustomButton} from '@/components/CustomButton';
import MiniChatbot from '@/components/MiniChatbot';
import ProgressBar from '@/components/ProgressBar';
import SectionCard from '@/components/SectionCard';
import {formatSection} from '@/helpers/formatSectionID';
import {formatUnit} from '@/helpers/formatUnitID';
import {useNavigation} from '@react-navigation/native';
import {LoadingIndicator} from '@/components/LoadingIndicator';

export default function SelfReflection() {
    const navigation = useNavigation();

    const {sectionID, unitID, currentUnit, totalUnits} = useLocalSearchParams();

    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [unitName, setUnitName] = useState<string>('');
    const [unitNumber, setUnitNumber] = useState<string>('');
    const [chatHistoryLength, setChatHistoryLength] = useState<number>(0);
    const handleChatHistoryUpdate = (length: number) => {
        setChatHistoryLength(length);
    };
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <ProgressBar progress={1} isQuestionnaire={false} />
            ),
        });
    }, [navigation]);

    useEffect(() => {
        if (sectionID && unitID) {
            (async () => {
                try {
                    const unitDetails = await unitEndpoints.getUnitDetails(
                        sectionID as string,
                        unitID as string
                    );

                    setUnitName(unitDetails.unitName);
                    setSectionNumber(formatSection(sectionID as string));
                    setUnitNumber(formatUnit(unitID as string));
                } catch (error) {
                    console.error(
                        'Error fetching unitDetails in Self-Reflection',
                        error
                    );
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [sectionID, unitID]);

    const handlePress = () => {

        if (parseInt(currentUnit as string) === parseInt(totalUnits as string)) {
            // if last unit, go back to Assessment Intro (FinalAssessment.tsx)
            router.push({
                pathname: 'FinalAssessment',
                params: {
                    sectionID,
                    unitID,
                    currentUnit,
                    totalUnits,
                    isFinal: 'true',
                },
            });
        } else {
            // after self-reflection navigate back to home for next unit
            router.replace('Home');
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
                    <ScrollView>
                        <SectionCard
                            title={`SECTION ${sectionNumber}, UNIT ${unitNumber}`}
                            subtitle={unitName}
                        />
                        <Text style={styles.screenTitle}>Self Reflection</Text>
                        <Text
                            style={{
                                fontSize: 11,
                                color: '#4143A3',
                                marginBottom: 20,
                                marginHorizontal: 10,
                            }}
                        >
                            Use a few words to share your thoughts on the
                            following question.
                        </Text>
                        <MiniChatbot
                            onChatHistoryUpdate={handleChatHistoryUpdate}
                            sectionID={sectionID as string}
                            unitID={unitID as string}
                        />
                    </ScrollView>
                    <CustomButton
                        label="continue"
                        backgroundColor="white"
                        onPressHandler={handlePress}
                        disabled={chatHistoryLength < 3}
                    />
                </>
            )}
        </ScrollView>
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
