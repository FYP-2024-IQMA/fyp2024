
const formatCheatSheet = (cheatsheet: any) => {
    if (Array.isArray(cheatsheet)) {
        return cheatsheet.map((item, index) => (
            <OverviewCard key={index} text={item}></OverviewCard>
        ));
    } else {
        return Object.entries(cheatsheet).map(([title, text], index) => (
            <OverviewCard isCheatsheetObject={true} key={index} title={title} text={text as string | string[]}></OverviewCard>
        ));
    }
}

import {ScrollView, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useState, useLayoutEffect, useEffect} from 'react';
import {CustomButton} from '@/components/CustomButton';
import {router, useLocalSearchParams} from 'expo-router';
import {useNavigation} from '@react-navigation/native';
import ProgressBar from '@/components/ProgressBar';
import { OverviewCard } from '@/components/OverviewCard';
import * as lessonEndpoints from '@/helpers/lessonEndpoints';

// where things show up
export default function CheatSheet() {
    const navigation = useNavigation();
    const {sectionID, unitID} = useLocalSearchParams();
    const [lessons, setLessons] = useState<any[]>([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <ProgressBar progress={0.25} isQuestionnaire={false}/>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        if (sectionID && unitID) {
            (async () => {

                const lessonDetails = await lessonEndpoints.getAllLesson(
                    sectionID as string,
                    unitID as string
                );

                setLessons(lessonDetails);
            })();
        }
    }, [sectionID, unitID]);

    const handlePress = () => {
        router.push("Lesson")
    };

    return (
        <ScrollView
            style={styles.container}
        >
            <View style={{marginBottom: 20}}>
                <View style={{flex: 1}}>
                    {lessons.map((lesson, index) => (
                        <View key={index} style={[styles.cheatSheet]}>
                            <Text style={styles.title}>{lesson.lessonName}</Text>
                            {formatCheatSheet(lesson.lessonCheatSheet)}
                        </View>
                    ))}
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        label="continue"
                        backgroundColor="white"
                        onPressHandler={handlePress}
                    />
                </View>
            </View>
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
