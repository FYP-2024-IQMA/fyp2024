import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {router, useLocalSearchParams, useRouter} from 'expo-router';

import {CustomButton} from '@/components/CustomButton';
import {OverviewCard} from '@/components/OverviewCard';
import ProgressBar from '@/components/ProgressBar';
import SectionCard from '@/components/SectionCard';
import {formatSection} from '@/helpers/formatSectionID';
import {formatUnit} from '@/helpers/formatUnitID';
import {useNavigation} from '@react-navigation/native';

const getKeyTakeawayDetails = async (
    sectionID: string,
    unitID: string,
    lessonID: string
) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/lesson/getlesson/${sectionID}/${unitID}/${lessonID}`;
        const response = await fetch(url);
        // const KeyTakeawayDetails = await response.json();
        const KeyTakeawayDetails = {
            sectionID: 'SEC0001',
            unitID: 'UNIT0001',
            lessonID: '1a',
            lessonName:
                'Lesson 1a: Understanding Verbal and Non-verbal Signals',
            lessonURL: 'https://youtu.be/4_5dayHDdBk?si=Jzg2RUbZ1S56eRXl&t=6',
            lessonDuration: 3.44,
            lessonText: null,
            lessonDescription:
                "🎤👀 Communication isn't just about what we say; it's also about how we say it!\r\n✨ Dive into the fascinating world of verbal and non-verbal signals, where the tone of your voice and the twinkle in your eye speak volumes. \r\nLearn to decipher these hidden messages and become a communication wizard! 🧙‍♂️",
            lessonKeyTakeaway: [
                'Verbal and non-verbal signals play crucial roles in communication, often conveying messages beyond words alone.',
                'Verbal signals encompass spoken language, including tone, pitch, and volume, which can convey emotions and intentions.',
                'Non-verbal signals, on the other hand, involve body language, facial expressions, gestures, and eye contact, providing additional context to verbal communication.',
                'Understanding both types of signals enhances communication effectiveness by allowing individuals to interpret and respond appropriately to the complete message being conveyed.',
            ],
            lessonCheatSheet: {
                '🗣️ Verbal Signals:':
                    '🎶 Tone of Voice: Emotions can be conveyed through variations in pitch, volume, and intonation.\r\n📚 Word Choice: Different words can evoke different reactions and meanings.\r\n🏃‍♂️ Pace: The speed at which someone speaks can indicate excitement, nervousness, or boredom.',
                '👁️ Non-verbal Signals:':
                    '🕺 Body Language: Posture, gestures, and facial expressions can speak volumes without saying a word.\r\n👀 Eye Contact: The level of eye contact can convey confidence, interest, or discomfort.\r\n🌍 Personal Space: Respect for personal space varies across cultures and can affect communication dynamics.',
            },
            dateCreated: '2024-08-18T14:59:11.210043+00:00',
        };
        return KeyTakeawayDetails;
    } catch (error) {
        console.error('Error fetching KeyTakeawayDetails:', error);
        return;
    }
};

export default function KeyTakeaway() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <ProgressBar progress={1} isQuestionnaire={false} />
            ),
        });
    }, [navigation]);

    const handlePress = () => {
        router.push('KeyTakeaway');
    };

    const {sectionID, unitID, lessonID} = useLocalSearchParams();
    const [sectionNumber, setSectionNumber] = useState<string>('');
    const [unitNumber, setUnitNumber] = useState<string>(''); // get from another endpoint
    const [unitName, setUnitName] = useState<string>(''); // used in section card
    const [lessonName, setLessonName] = useState<string>(''); // includes KeyTakeaway number
    const [keyTakeaway, setKeyTakeaway] = useState<string[]>([]);

    useEffect(() => {
        const fetchDetails = async () => {
            const sectionID = 'SEC0001';
            const unitID = 'UNIT0001';
            const lessonID = '1a';
            // if (sectionID && unitID && lessonID) {
            const KeyTakeawayDetails = await getKeyTakeawayDetails(
                sectionID as string,
                unitID as string,
                lessonID as string
            );

            if (!KeyTakeawayDetails) {
                return;
            }
            setSectionNumber(formatSection(sectionID as string));
            console.log(sectionNumber);
            setUnitNumber(formatUnit(unitID as string));
            // setUnitName(KeyTakeawayDetails.unitName);
            setUnitName('Foundations Of Communication');

            setLessonName(KeyTakeawayDetails.lessonName);
            console.log(lessonName);
            setKeyTakeaway(KeyTakeawayDetails.lessonKeyTakeaway);
        };

        fetchDetails();
    }, []);
    return (
        <View style={styles.container}>
            <View>
                <SectionCard
                    title={`SECTION ${sectionNumber}, UNIT ${unitNumber}`}
                    subtitle={unitName}
                />
                <Text
                    style={{
                        fontSize: 13,
                        fontWeight: 'bold',
                        color: '#4143A3',
                        marginBottom: 20,
                        marginHorizontal: 10,
                    }}
                >
                    {lessonName}
                </Text>

                <Text style={styles.takeawayHeader}>Key Takeaways</Text>
                {keyTakeaway.map((takeaway: string, index: number) => (
                    <View key={index}>
                        <Text style={styles.takeawayText}>
                            {index + 1}. {takeaway}
                        </Text>
                    </View>
                ))}
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row-reverse',
                    }}
                >
                    <Image
                        style={{height: 110}}
                        source={require('@/assets/images/happycloseeye.png')}
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
    takeawayHeader: {
        marginBottom: 5,
        marginLeft: 15,
        color: '#4143A3',
        fontWeight: 'bold',
    },
    takeawayText: {
        marginLeft: 15,
        fontSize: 12,
        lineHeight: 25,
        color: '#4143A3',
        marginBottom: 15,
    },
});
