// components/SectionCard.tsx

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Colors} from '@/constants/Colors';
import React, { useEffect, useRef, useState, useContext } from 'react';
import * as resultEndpoints from '@/helpers/resultEndpoints';
import * as unitEndpoints from '@/helpers/unitEndpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatSection } from '@/helpers/formatSectionID';
import ProgressBar from '@/components/ProgressBar';
import { AuthContext } from '@/context/AuthContext';
import { router, useLocalSearchParams } from 'expo-router';


interface SectionProfileProps {
    sectionID: string;
    sectionName: string;
    sectionDuration: string;
}

const SectionProfile: React.FC<SectionProfileProps> = ({ sectionID, sectionName, sectionDuration }) => {

    const {currentUser, isLoading} = useContext(AuthContext);
    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [sectionCircularProgress, setSectionCircularProgress] = useState<number>(0);
    const [status, setStatus] = useState<string>('in-progress');

    useEffect(() => {
        (async () => {
            // check if final assessment is completed!
            // if yes status = "completed"

            // KIV: if no check sectionProgress and noOfUnits to see if user is in the middle of the section

            // if sectionParam > currentSection, status = "not-started"

            let sectionProgress =
                await resultEndpoints.numberOfCompletedUnitsPerSection(
                    currentUser.sub,
                    sectionID
                );

            const noOfUnits = await unitEndpoints.numberOfUnitsPerSection(
                sectionID
            );

            const currentSection = await AsyncStorage.getItem('currentSection');

            const sectionParam = formatSection(sectionID as string);
            setSectionNumber(sectionParam);

            console.log('Current Section:', currentSection);
            console.log('sectionParam:', sectionParam);

            // need to + 1 to sectionProgress when user complete final assessment
            if (parseInt(sectionParam) < parseInt(currentSection as string))
                sectionProgress += 1;

            console.log('Section Progress:', sectionProgress);
            console.log('No of units:', noOfUnits);

            setSectionCircularProgress(() => sectionProgress / (noOfUnits + 1));
        })();
    }, [sectionCircularProgress]);


    const handlePress = () => {
        console.log('Section ID:', sectionID);
        router.push('Home')

        // check if final assessment is completed
        // if yes route to Section Introduction



    }


    return (
        <TouchableOpacity style={styles.sectionCard} onPress={handlePress}>
            <View style={styles.textContainer}>
                <Text style={styles.sectionCardTitle}>SECTION {sectionNumber}</Text>
                <Text style={styles.sectionCardTitle}>{sectionName}</Text>
                <Text style={styles.sectionCardSubtitle}>
                    {sectionDuration}
                </Text>
                <ProgressBar progress={sectionCircularProgress} isQuestionnaire={false} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    sectionCard: {
        backgroundColor: Colors.default.purple100,
        padding: 25,
        borderRadius: 15,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionCardTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectionCardSubtitle: {
        color: 'white',
        fontSize: 14,
    },
    sectionButton: {
        backgroundColor: Colors.default.purple500,
        padding: 10,
        borderRadius: 10,
        borderColor: '#5E43C2',
        borderWidth: 2,
    },
    textContainer: {
        maxWidth: '80%',
    },
});

export default SectionProfile;


