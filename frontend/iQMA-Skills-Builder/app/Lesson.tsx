import {StyleSheet, Text, View} from 'react-native';
import SectionCard from '@/components/SectionCard';
import React, {useState, useLayoutEffect} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import {CustomButton} from '@/components/CustomButton';
import ProgressBar from '@/components/ProgressBar';
import {useNavigation} from '@react-navigation/native';
import {OverviewCard} from '@/components/OverviewCard';

// where things show up
export default function Lesson() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <ProgressBar progress={0.25} isQuestionnaire={false} />
            ),
        });
    }, [navigation]);

    const handlePress = () => {
        // router.push('Lesson');
    };

    const [lessonName, setLessonName] = useState<string>(
        'Lesson 1a: Understanding Verbal and Non-Verbal Signals'
    );
    const [videoId, setVideoId] = useState<string>('4_5dayHDdBk');
    const [playing, setPlaying] = useState<boolean>(false);
    const [lessonDescription, setLessonDescription] = useState<string>(
        "🎤👀 Communication isn't just about what we say; it's also about how we say it!\n\n ✨ Dive into the fascinating world of verbal and non-verbal signals, where the tone of your voice and the twinkle in your eye speak volumes. \n\nLearn to decipher these hidden messages and become a communication wizard! 🧙‍♂️"
    );

    const onStateChange = (state: string) => {
        if (state === 'ended') {
            setPlaying(false);
        }
        if (state === 'playing') {
            setPlaying(true);
        }
        if (state === 'paused') {
            setPlaying(false);
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <SectionCard
                    title="SECTION 1, UNIT 1"
                    subtitle="Foundations of Communication"
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
                    {lessonName}
                </Text>

                <OverviewCard text={lessonDescription}></OverviewCard>

                {videoId ? (
                    <YoutubePlayer
                        height={300}
                        play={playing}
                        onChangeState={onStateChange}
                        videoId={videoId} // YouTube video ID
                    />
                ) : (
                    <Text style={{marginBottom: 30, textAlign: 'center'}}>
                        Loading Video...
                    </Text>
                )}
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
