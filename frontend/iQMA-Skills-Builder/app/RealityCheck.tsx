import * as unitEndpoints from '@/helpers/unitEndpoints';

import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {router, useLocalSearchParams, useRouter} from 'expo-router';

import {Colors} from '@/constants/Colors';
import {CustomButton} from '@/components/CustomButton';
import {LoadingIndicator} from '@/components/LoadingIndicator';
import {OverviewCard} from '@/components/OverviewCard';
import ProgressBar from '@/components/ProgressBar';
import SectionCard from '@/components/SectionCard';
import {formatSection} from '@/helpers/formatSectionID';
import {formatUnit} from '@/helpers/formatUnitID';
import {useNavigation} from '@react-navigation/native';

// where things show up
export default function RealityCheck() {
    const navigation = useNavigation();

    // Use this for Routing
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
    const [unitName, setUnitName] = useState<string>('');
    const [realityCheckDescription, setRealityCheckDescription] = useState<
        string[]
    >([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {}, []);

    useLayoutEffect(() => {
        const progress =
            parseInt(currentProgress as string) /
            parseInt(totalProgress as string);

        navigation.setOptions({
            headerTitle: () => (
                <ProgressBar progress={progress} isQuestionnaire={false} />
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

                    setRealityCheckDescription(unitDetails.realityCheck);
                    setUnitName(unitDetails.unitName);
                    setSectionNumber(formatSection(sectionID as string));
                    setUnitNumber(formatUnit(unitID as string));
                } catch (error) {
                    console.error(
                        'Error fetching Unit details in Reality Check:',
                        error
                    );
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [sectionID, unitID]);

    const handlePress = async () => {
        router.push({
            pathname: 'Assessment',
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
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <LoadingIndicator />
            ) : (
                <>
                    <View style={{flexGrow: 1}}>
                        <SectionCard
                            title={`SECTION ${sectionNumber}, UNIT ${unitNumber}`}
                            subtitle={unitName}
                        />
                        <Text style={styles.screenTitle}>
                            Unit {unitNumber}: Reality Check
                        </Text>

                        {realityCheckDescription.length > 0 ? (
                            realityCheckDescription.map(
                                (description, index) => (
                                    <OverviewCard
                                        key={index}
                                        text={description}
                                    />
                                )
                            )
                        ) : (
                            <OverviewCard
                                isError={true}
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
                                source={require('@/assets/images/happycloseeye.png')}
                            ></Image>
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
    screenTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4143A3',
        marginBottom: 20,
        marginHorizontal: 10,
    },
});
