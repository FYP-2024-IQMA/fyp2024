import {Image, StyleSheet, Text, View} from 'react-native';
import SectionCard from '@/components/SectionCard';
import React, {useState, useLayoutEffect, useEffect} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import {CustomButton} from '@/components/CustomButton';
import {router, useLocalSearchParams, useRouter} from 'expo-router';
import {useNavigation} from '@react-navigation/native';
import ProgressBar from '@/components/ProgressBar';
import {OverviewCard} from '@/components/OverviewCard';

const getUnitDetails = async (sectionID: string, unitID: string) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/unit/getallunitsbysectionandunit/${sectionID}/${unitID}`;
        const response = await fetch(url);
        const unitDetails = await response.json();
        return unitDetails;
    } catch (error) {
        console.error('Error fetching unitDetails:', error);
        return 0;
    }
};

const formatSection = (sectionID: string): string => {

    const sectionNumber = sectionID.replace(/\D/g, '').replace(/^0+/, '');

    return sectionNumber;
};

const formatUnit = (unitID: string): string => {

    const unitNumber = unitID.replace(/\D/g, '').replace(/^0+/, '');
  
    return unitNumber;
};

// where things show up
export default function SectionIntroduction() {
    const navigation = useNavigation();

    const { sectionID, unitID } = useLocalSearchParams();
    const [sectionNumber, setSectionNumber] = useState<string>("");
    const [unitNumber, setUnitNumber] = useState<string>("");
    const [unitName, setUnitName] = useState<string>("");
    const [unitDescription, setUnitDescription] = useState<string>("");
    const [unitSubDescription, setUnitSubDescription] = useState<string>("");


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
                const unitDetails = await getUnitDetails(sectionID as string, unitID as string);

                // console.log(unitDetails[0]["unitDescription"])
                const splitDescription = unitDetails[0]["unitDescription"].split('\n');

                if (splitDescription) {
                    setUnitName(unitDetails[0]["unitName"]);
                    setUnitDescription(splitDescription[0]);
                    setUnitSubDescription(splitDescription[1]);          
                }
            })();
        }
        setSectionNumber(formatSection(sectionID as string));
        setUnitNumber(formatUnit(unitID as string));
    }, [sectionID, unitID]);

    const handlePress = () => {
        router.push('Lesson');
    };

    return (
        <View style={styles.container}>
            <View>
                <SectionCard
                    // title={formatSectionUnit(sectionID as string, unitID as string)}
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

                <OverviewCard text={unitDescription}></OverviewCard>
                <OverviewCard text={unitSubDescription}></OverviewCard>

                <View style={{width: "100%", flexDirection: 'row-reverse'}}>
                    <Image
                        style={{}}
                        source={require('@/assets/images/neutral.png')}
                    ></Image>
                </View>
            </View>

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
        justifyContent: 'space-between',
    },
});
