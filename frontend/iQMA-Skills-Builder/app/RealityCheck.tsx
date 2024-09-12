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

// where things show up
export default function RealityCheck() {
    const navigation = useNavigation();

    // Use this for Routing
    // const {sectionID, unitID} = useLocalSearchParams();
    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [unitNumber, setUnitNumber] = useState<string>('');
    const [unitName, setUnitName] = useState<string>('');
    const [realityCheckDescription, setRealityCheckDescription] = useState<string[]>([]);
    
    // Only for testing, please delete
    const [sectionID, setSectionID] = useState<string>("SEC0001")
    const [unitID, setUnitID] = useState<string>("UNIT0001")

    useEffect(() => {
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

                setRealityCheckDescription(unitDetails.realityCheck);
                setUnitName(unitDetails.unitName);
            })();
            setSectionNumber(formatSection(sectionID as string));
            setUnitNumber(formatUnit(unitID as string));
        }
    }, [sectionID, unitID]);

    const handlePress = async () => {

        router.push({
            pathname: 'Assessment',
            params: {sectionID: sectionID, unitID: unitID},
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
                    Unit {unitNumber}: Reality Check
                </Text>

                {realityCheckDescription.length > 0 ? (
                    realityCheckDescription.map((description, index) => (
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
        flex: 1
    },
});
