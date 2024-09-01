// screens/HomeScreen.tsx

import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import ProgressPath from '@/components/ProgressPath';
import SectionCard from '@/components/SectionCard';
import TopStats from '@/components/TopStats';

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
    console.log('LOAD NUMBER OF UNIT');

    try {
        const url = `http://${process.env.EXPO_PUBLIC_LOCALHOST_URL}:3000/unit/gettotalunit/${sectionID}`;
        const response = await fetch(url);

        const unitProgress = await response.json();
        return unitProgress;
    } catch (error) {
        console.error('Error while loading unit progress:', error);
        return 0;
    }
};

const numberOfCompletedUnitsPerSection = async (
    userID: string,
    sectionID: string
): Promise<number> => {
    console.log('LOAD COMPLETED UNIT');

    try {
        const url = `http://${process.env.EXPO_PUBLIC_LOCALHOST_URL}:3000/result/getuserprogress/${userID}/${sectionID}`;
        const response = await fetch(url);
        const unitProgress = await response.json();
        return unitProgress;
    } catch (error) {
        console.error('Error while loading completed unit:', error);
        return 0;
    }
};

const HomeScreen: React.FC = () => {
    const [icons, setIcons] = useState<Icon[]>([]);
    const [circularProgress, setCircularProgress] = useState<number>(0);
    const [sectionCircularProgress, setSectionCircularProgress] =
        useState<number>(0);

    const loadUnitCircularProgress = async (
        userID: string,
        sectionID: string,
        unitID: string
    ) => {
        console.log('LOAD UNIT CIRCULAR PROGRESS');

        try {
            const url = `http://${process.env.EXPO_PUBLIC_LOCALHOST_URL}:3000/result/getcircularprogress/${userID}/${sectionID}/${unitID}`;
            const response = await fetch(url);
            const circularProgress = await response.json();
            setCircularProgress(circularProgress);
        } catch (error) {
            console.error('Error while loading circular progress:', error);
        }
    };

    const loadSectionProgress = async (
        userID: string,
        sectionID: string
    ): Promise<number> => {
        console.log('LOAD SECTION PROGRESS');

        try {
            const url = `http://${process.env.EXPO_PUBLIC_LOCALHOST_URL}:3000/result/getuserprogress/${userID}/${sectionID}`;
            const response = await fetch(url);
            const sectionProgress = await response.json();
            setSectionCircularProgress(sectionProgress);
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
            const totalUnits = await numberOfUnitsPerSection('SEC0001');
            const completedUnits = await numberOfCompletedUnitsPerSection(
                'USR0001',
                'SEC0001'
            );
            const iconsStatus = getIconStatus(totalUnits, completedUnits);
            setIcons(iconsStatus);
            loadUnitCircularProgress('USR0001', 'SEC0001', 'UNT0001');
            loadSectionProgress('USR0001', 'SEC0001');
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
