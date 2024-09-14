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

export default function SelfReflection() {
    const navigation = useNavigation();

    // const { sectionID } = useLocalSearchParams();
    // const {sectionID, unitID, lessonID} = useLocalSearchParams();

    const sectionID = 'SEC0001'; // to be removed
    const unitID = 'UNIT0001';
    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [sectionName, setSectionName] = useState<string>('');
    const [unitName, setUnitName] = useState<string>('');
    const [unitNumber, setUnitNumber] = useState<string>('');
    const [chatHistoryLength, setChatHistoryLength] = useState<number>(0);
    const handleChatHistoryUpdate = (length: number) => {
        setChatHistoryLength(length);
    };
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
                const unitDetails = await unitEndpoints.getUnitDetails(
                    sectionID as string,
                    unitID as string
                );

                setUnitName(unitDetails.unitName);
            })();
            setSectionNumber(formatSection(sectionID as string));
            setUnitNumber(formatUnit(unitID as string));
        }
    }, [sectionID, unitID]);

    const handlePress = () => {
        router.push({
            pathname: 'UnitIntroduction',
            params: {sectionID: sectionID, unitID: 'UNIT0001'},
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <SectionCard
                    title={`SECTION ${sectionNumber}, UNIT ${unitNumber}`}
                    subtitle={unitName}
                />
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#4143A3',
                        marginBottom: 7,
                        marginHorizontal: 10,
                    }}
                >
                    Self Reflection
                </Text>
                <Text
                    style={{
                        fontSize: 11,
                        color: '#4143A3',
                        marginBottom: 20,
                        marginHorizontal: 10,
                    }}
                >
                    Use a few words to share your thoughts on the following
                    question.
                </Text>
                <MiniChatbot onChatHistoryUpdate={handleChatHistoryUpdate} />
            </ScrollView>
            <View
                style={{
                    alignSelf: 'center',
                    bottom: 20,
                }}
            >
                <CustomButton
                    label="continue"
                    backgroundColor="white"
                    onPressHandler={handlePress}
                    disabled={chatHistoryLength < 3}
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
