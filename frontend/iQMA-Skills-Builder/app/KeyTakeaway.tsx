import * as lessonEndpoints from '@/helpers/lessonEndpoints';
import * as unitEndpoints from '@/helpers/unitEndpoints';

import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {router, useLocalSearchParams, useRouter} from 'expo-router';

import {CustomButton} from '@/components/CustomButton';
import {OverviewCard} from '@/components/OverviewCard';
import ProgressBar from '@/components/ProgressBar';
import SectionCard from '@/components/SectionCard';
import {formatSection} from '@/helpers/formatSectionID';
import {formatUnit} from '@/helpers/formatUnitID';
import {useNavigation} from '@react-navigation/native';

export default function KeyTakeaway() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <ProgressBar progress={1} isQuestionnaire={false} />
            ),
        });
    }, [navigation]);

    const handlePress = () => {
        router.push({
            pathname: 'CheatSheet',
            params: {sectionID: sectionID, unitID: unitID},
        });
    };

    const sectionID = 'SEC0001';
    const unitID = 'UNIT0001';
    const lessonID = '1a';
    // const {sectionID, unitID, lessonID} = useLocalSearchParams();
    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [unitNumber, setUnitNumber] = useState<string>('');
    const [unitName, setUnitName] = useState<string>('');
    const [lessonName, setLessonName] = useState<string>('');
    const [keyTakeaway, setKeyTakeaway] = useState<string[]>([]);

    useEffect(() => {
        if (sectionID && unitID && lessonID) {
            (async () => {
                const unitDetails = await unitEndpoints.getUnitDetails(
                    sectionID as string,
                    unitID as string
                );

                const lessonDetails = await lessonEndpoints.getLessonDetails(
                    sectionID as string,
                    unitID as string,
                    lessonID as string
                );

                setLessonName(lessonDetails.lessonName);
                setUnitName(unitDetails.unitName);
                setKeyTakeaway(lessonDetails.lessonKeyTakeaway);
            })();
            setSectionNumber(formatSection(sectionID as string));
            setUnitNumber(formatUnit(unitID as string));
        }
    }, [sectionID, unitID]);
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
                    {lessonName}
                </Text>

                <Text style={styles.takeawayHeader}>Key Takeaways</Text>
                {keyTakeaway && keyTakeaway.length > 0 ? (
                    keyTakeaway.map((takeaway: string, index: number) => (
                        <View key={index}>
                            <Text style={styles.takeawayText}>
                                {index + 1}. {takeaway}
                            </Text>
                        </View>
                    ))
                ) : (
                    <OverviewCard
                        isError={true}
                        text="Key Takeaways are not available. Please check with your administrator."
                    />
                )}

                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row-reverse',
                    }}
                >
                    <Image
                        style={{height: 110}}
                        source={require('@/assets/images/happycloseeye.png')}
                    ></Image>
                </View>
            </View>

            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
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
    takeawayHeader: {
        marginBottom: 10,
        marginLeft: 15,
        color: '#4143A3',
        fontWeight: 'bold',
        fontSize: 14,
    },
    takeawayText: {
        marginLeft: 15,
        fontSize: 12,
        lineHeight: 25,
        color: '#4143A3',
        marginBottom: 15,
    },
});
