import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Audio, AVPlaybackStatus} from 'expo-av';
import Slider from '@react-native-community/slider';
import {useFocusEffect} from '@react-navigation/native';
import {FontAwesome5, Ionicons} from '@expo/vector-icons';
import {Colors} from '@/constants/Colors';
import {OverviewCard} from './OverviewCard';

interface AudioPlayerProps {
    audioUri: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({audioUri}) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>(0);
    const [position, setPosition] = useState<number>(0);
    const [seekPosition, setSeekPosition] = useState<number | null>(null);
    const [error, setError] = useState<boolean>(false);

    // Load audio when component mounts
    useEffect(() => {
        loadAudio();

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    // Load the audio
    const loadAudio = async () => {
        try {
            const {sound: newSound, status} = await Audio.Sound.createAsync(
                typeof audioUri === 'string' ? {uri: audioUri} : audioUri, // uri if string, else is file
                {shouldPlay: false}
            );
            setSound(newSound);
            if (status.isLoaded) {
                setDuration(status.durationMillis ?? 0);
            }
            newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        } catch (error) {
            setError(true);
            console.error('Error loading audio:', error);
        }
    };

    const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
        if (status.isLoaded) {
            setPosition(status.positionMillis ?? 0);
            setDuration(status.durationMillis ?? 0);
            setIsPlaying(status.isPlaying);
        }
    };

    const playAudio = async () => {
        if (sound) {
            if (seekPosition !== null) {
                await sound.setPositionAsync(seekPosition);
                setSeekPosition(null); // reset seek position after playing
            }

            if (isPaused) {
                // if audio paused, resume from the current position
                await sound.playAsync();
                setIsPaused(false);
            } else {
                // if audio not paused, play from the current position or beginning
                await sound.playAsync();
            }
        }
    };

    const pauseAudio = async () => {
        if (sound && isPlaying) {
            await sound.pauseAsync();
            setIsPaused(true);
        }
    };

    const stopAudio = async () => {
        if (sound) {
            await sound.stopAsync();
        }
    };

    const seekAudio = async (value: number) => {
        setSeekPosition(value); // Set the seek position for when play is pressed
        if (sound && isPlaying) {
            await sound.setPositionAsync(value); // Update the position if playing
        }
    };

    // Stop audio screen loses focus
    useFocusEffect(
        React.useCallback(() => {
            return () => {
                if (sound) {
                    sound.stopAsync();
                    setIsPlaying(false);
                    setIsPaused(false);
                    setPosition(0);
                }
            };
        }, [sound])
    );

    if (error) {
        return (
            <>
                <OverviewCard
                    isError={true}
                    text="Audio is not available. Please check with your administrator."
                />
            </>
        );
    }

    return (
        <View>

            <Text style={styles.audioTitle}>Listen & Learn</Text>

            <View style={styles.logoContainer}>
                <View style={styles.audioCircle}>
                    <FontAwesome5
                        name="headphones"
                        size={50}
                        color={Colors.default.purple500}
                    />
                </View>
            </View>

            <Slider
                style={{height: 30}}
                minimumValue={0}
                maximumValue={duration}
                value={position}
                onSlidingComplete={seekAudio}
                minimumTrackTintColor={Colors.default.purple500}
                maximumTrackTintColor={Colors.default.purple500}
                thumbTintColor={Colors.default.purple500}
            />

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 6,
                }}
            >
                <TouchableOpacity onPress={playAudio} disabled={isPlaying}>
                    <Ionicons
                        name="play"
                        color={Colors.default.purple500}
                        size={24}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={pauseAudio} disabled={!isPlaying}>
                    <Ionicons
                        name="pause"
                        color={Colors.default.purple500}
                        size={24}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screenTitle: {
        fontSize: Colors.lessonName.fontSize,
        fontWeight: 'bold',
        color: Colors.header.color,
        marginBottom: 20,
        marginHorizontal: 10,
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 10,
    },
    audioCircle: {
        backgroundColor: Colors.light.unFilled,
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
    },
    audioTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.header.color,
        marginBottom: 20,
        marginHorizontal: 10,
        textAlign: 'center',
    },
});
