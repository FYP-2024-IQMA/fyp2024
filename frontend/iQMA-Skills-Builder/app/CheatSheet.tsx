import {ScrollView, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useState, useLayoutEffect, useEffect} from 'react';
import {CustomButton} from '@/components/CustomButton';
import {router, useLocalSearchParams} from 'expo-router';
import {useNavigation} from '@react-navigation/native';
import ProgressBar from '@/components/ProgressBar';
import {OverviewCard} from '@/components/OverviewCard';
import * as lessonEndpoints from '@/helpers/lessonEndpoints';
import {formatUnit} from '@/helpers/formatUnitID';
import {LoadingIndicator} from '@/components/LoadingIndicator';

const formatCheatSheet = (cheatsheet: any) => {
    if (Array.isArray(cheatsheet)) {
        if (cheatsheet.length === 0) {
            return (
                <OverviewCard
                    isError={true}
                    text="Lesson Cheatsheet is not available. Please check with your administrator."
                />
            );
        }
        return cheatsheet.map((item, index) => (
            <OverviewCard key={index} text={item}></OverviewCard>
        ));
    } else {
        if (Object.keys(cheatsheet).length === 0) {
            return (
                <OverviewCard
                    isError={true}
                    text="Lesson Cheatsheet is not available. Please check with your administrator."
                />
            );
        }
        return Object.entries(cheatsheet).map(([title, text], index) => (
            <OverviewCard
                isCheatsheetObject={true}
                key={index}
                title={title}
                text={text as string | string[]}
            ></OverviewCard>
        ));
    }
};

// where things show up
export default function CheatSheet() {
    const navigation = useNavigation();
    const {sectionID, unitID, currentUnit, totalUnits, isFinal} = useLocalSearchParams();
    const [lessons, setLessons] = useState<any[]>([]);
    const [unitNumber, setUnitNumber] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

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
                try {
                    const lessonDetails = await lessonEndpoints.getAllLesson(
                        sectionID as string,
                        unitID as string
                    );

                    const processedLessonDetails = lessonDetails
                        .filter(
                            (lesson: any) => !lesson.lessonID.includes('.2')
                        )
                        .map((lesson: any) => ({
                            ...lesson,
                            lessonName: lesson.lessonName.replace('.1', ''),
                        }));

                    setLessons(processedLessonDetails);
                    setUnitNumber(formatUnit(unitID as string));
                } catch (error) {
                    console.error(
                        'Error fetching Lesson details in CheatSheet:',
                        error
                    );
                } finally {
                    setIsLoading(false);
                }
            })();
        }
    }, [sectionID, unitID]);

    const handlePress = () => {
        router.push({
            pathname: 'RealityCheck',
            params: {
                sectionID,
                unitID,
                currentUnit,
                totalUnits,
                isFinal,
            },
        });
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
                    <View>
                        <Text style={[styles.title, {marginHorizontal: 10}]}>
                            Unit {unitNumber}: Cheat Sheet
                        </Text>
                        {lessons.length > 0 ? (
                            lessons.map((lesson, index) => (
                                <View key={index} style={[styles.cheatSheet]}>
                                    <Text style={styles.title}>
                                        {lesson.lessonName}
                                    </Text>
                                    {formatCheatSheet(lesson.lessonCheatSheet)}
                                </View>
                            ))
                        ) : (
                            <OverviewCard
                                text="Lesson Cheatsheets are not available. Please check with your administrator."
                                isError={true}
                            ></OverviewCard>
                        )}
                    </View>
                    <View style={{marginBottom: 40}}>
                        <CustomButton
                            label="continue"
                            backgroundColor="white"
                            onPressHandler={handlePress}
                        />
                    </View>
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4143A3',
        marginBottom: 20,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 20,
    },
    cheatSheet: {
        borderColor: '#C3B1FF',
        borderRadius: 10,
        borderWidth: 2,
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        // shadow properties
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
});
