// screens/HomeScreen.tsx

import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '@/context/AuthContext';
import ProgressPath from '@/components/ProgressPath';
import SectionCard from '@/components/SectionCard';
import TopStats from '@/components/TopStats';
import {useContext} from 'react';

interface SectionDividerProps {
    label: string;
}

interface Icon {
    name: string;
    color: string;
    size: number;
    status: string;
}

const numberOfUnitsPerSection = async (sectionID: string): Promise<number> => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/unit/gettotalunit/${sectionID}`;
        const response = await fetch(url);
        const unitProgress = await response.json();
        return unitProgress;
    } catch (error) {
        console.error('Error while loading unit progress:', error);
        return 0;
    }
};

// need to + 1 to find the current unit
const numberOfCompletedUnitsPerSection = async (
    userID: string,
    sectionID: string
): Promise<number> => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/result/getuserprogress/${userID}/${sectionID}`;
        const response = await fetch(url);
        const unitProgress = await response.json();
        return unitProgress;
    } catch (error) {
        console.error('Error while loading completed unit:', error);
        return 0;
    }
};

const HomeScreen: React.FC = () => {
    const {currentUser, isLoading} = useContext(AuthContext);
    const [icons, setIcons] = useState<Icon[]>([]);
    const [circularProgress, setCircularProgress] = useState<number>(0);
    const [sectionCircularProgress, setSectionCircularProgress] =
        useState<number>(0);

    const loadUnitCircularProgress = async (
        userID: string,
        sectionID: string,
        unitID: string
    ) => {
        // console.log('LOAD UNIT CIRCULAR PROGRESS');
        // console.log(userID, sectionID, unitID);

        try {
            const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/result/getcircularprogress/${userID}/${sectionID}/${unitID}`;
            const response = await fetch(url);
            const circularProgress = await response.json();
            setCircularProgress(circularProgress * 100);
        } catch (error) {
            console.error('Error while loading circular progress:', error);
        }
    };

    const getCurrentSection = async (): Promise<number> => {
        try {
            const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/result/getuserprogress/${currentUser.sub}`;
            const response = await fetch(url);
            const completedSection = await response.json();
            return completedSection + 1;
        } catch (error) {
            console.error('Error while loading current section:', error);
            return 0;
        }
    };

    // number of units user did out of total units in that section
    // will show 0 if only lessons done in unit 1, because it 0 units completed
    const loadSectionProgress = async (
        userID: string,
        sectionID: string
    ): Promise<number> => {
        try {
            const sectionProgress = await numberOfCompletedUnitsPerSection(
                userID,
                sectionID
            );

            const noOfUnits = await numberOfUnitsPerSection(sectionID);

            setSectionCircularProgress(
                Math.ceil((sectionProgress / noOfUnits) * 100)
            );

            return sectionProgress;
        } catch (error) {
            console.error('Error while loading section progress:', error);
            return 0;
        }
    };

    const getIconStatus = (totalUnits: number, completedUnits: number) => {
        const iconTypes = ['Trophy', 'staro', 'key', 'book'];
        return Array.from({length: totalUnits}, (_, index) => {
            let status, icon;
            if (index < completedUnits) {
                status = 'completed';
                icon = iconTypes[index % iconTypes.length];
            } else if (index === completedUnits) {
                status = 'in-progress';
                icon = iconTypes[index % iconTypes.length];
            } else {
                status = 'not-started';
                icon = iconTypes[index % iconTypes.length];
            }
            return {name: icon, color: '#FFFFFF', size: 40, status};
        });
    };

    useEffect(() => {
        const fetchProgressData = async () => {
            const currentSection = await getCurrentSection();
            await AsyncStorage.setItem(
                'currentSection',
                currentSection.toString()
            );

            const sectionID = `SEC${currentSection
                .toString()
                .padStart(4, '0')}`;
            await AsyncStorage.setItem('sectionID', sectionID);

            const totalUnits = await numberOfUnitsPerSection(`${sectionID}`);
            const completedUnits = await numberOfCompletedUnitsPerSection(
                `${currentUser.sub}`,
                `${sectionID}`
            );

            // unit to light up
            const lightedUnit = completedUnits + 1;
            const unitID = `UNIT${lightedUnit.toString().padStart(4, '0')}`;
            await AsyncStorage.setItem('unitID', unitID);

            const iconsStatus = getIconStatus(totalUnits, completedUnits);
            setIcons(iconsStatus);
            loadUnitCircularProgress(
                `${currentUser.sub}`,
                `${sectionID}`,
                `${unitID}`
            );
            loadSectionProgress(`${currentUser.sub}`, `${sectionID}`);
        };

        fetchProgressData();
    }, []);
    const SectionDivider: React.FC<SectionDividerProps> = ({label}) => (
        <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{label}</Text>
            <View style={styles.dividerLine} />
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Top Stats */}
            <TopStats circularProgress={sectionCircularProgress} />

            {/* Section 1 */}
            <SectionCard
                title="SECTION 1, UNIT 1"
                subtitle="Foundations of Communication"
            />

            <View>
                <ProgressPath
                    icons={icons}
                    circularProgress={circularProgress}
                />
            </View>
            {/* Divider */}
            <SectionDivider label="Written Communication Proficiency" />

            {/* Section 2 */}
            <SectionCard
                title="SECTION 1, UNIT 2"
                subtitle="Written Communication Proficiency"
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F5F5F5',
        marginTop: 10
    },
    lineSeparator: {
        height: 1,
        backgroundColor: '#CCC',
        marginVertical: 10,
    },
    sectionLabel: {
        textAlign: 'center',
        color: '#666',
        marginBottom: 20,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    dividerText: {
        marginHorizontal: 10,
        fontWeight: 'bold',
        color: '#AAAAAA',
    },
});

export default HomeScreen;
