import {Image, StyleSheet, Text, View} from 'react-native';
import SectionCard from '@/components/SectionCard';
import React, {useState, useLayoutEffect, useEffect} from 'react';
import {CustomButton} from '@/components/CustomButton';
import {router, useLocalSearchParams, useRouter} from 'expo-router';
import {useNavigation} from '@react-navigation/native';
import ProgressBar from '@/components/ProgressBar';
import {OverviewCard} from '@/components/OverviewCard';
import {formatSection} from '@/helpers/formatSectionID';
import {formatUnit} from '@/helpers/formatUnitID';
import * as unitEndpoints from '@/helpers/unitEndpoints';

// where things show up
export default function UnitIntroduction() {
    const navigation = useNavigation();

    const {sectionID, unitID, lessonID} = useLocalSearchParams();
    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [unitNumber, setUnitNumber] = useState<string>('');
    const [unitName, setUnitName] = useState<string>('');
    const [unitDescription, setUnitDescription] = useState<string[]>([]);

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

    const handlePress = () => {
        // router.push('Lesson');
        router.push({
            pathname: 'Lesson',
            // params: {sectionID: sectionID, unitID: unitID, lessonID: '1a'},
            params: {sectionID: sectionID, unitID: unitID, lessonID: lessonID},
        });
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

            <CustomButton
                label="continue"
                backgroundColor="white"
                onPressHandler={handlePress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        flex: 1
    },
});
