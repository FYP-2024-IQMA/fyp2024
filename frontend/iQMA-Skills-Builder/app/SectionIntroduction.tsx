import {StyleSheet, Text, View} from 'react-native';
import SectionCard from '@/components/SectionCard';
import React, {useState, useLayoutEffect} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import {CustomButton} from '@/components/CustomButton';
import {router} from 'expo-router';
import {useNavigation} from '@react-navigation/native';
import ProgressBar from '@/components/ProgressBar';

// where things show up
export default function SectionIntroduction() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <ProgressBar progress={0.25} isQuestionnaire={false} />
            ),
        });
    }, [navigation]);

    const handlePress = () => {
        router.push('UnitIntroduction');
    };

    const [videoId, setVideoId] = useState<string>('pU4fCakueEE');
    const [playing, setPlaying] = useState<boolean>(false);

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
                Section Introduction
            </Text>
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