import {
    Button,
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import {AuthContext} from '@/context/AuthContext';
import {Colors} from '@/constants/Colors';
import {
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
} from 'react';
import {Audio, AVPlaybackStatus} from 'expo-av';
import Slider from '@react-native-community/slider';
import {useFocusEffect} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';

export const AudioPlayer = () => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
    const [isSeeking, setIsSeeking] = useState<boolean>(false);
    const [seekPosition, setSeekPosition] = useState<number>(0); // In milliseconds

    // Function to play sound
    const playSound = async () => {
        try {
            const {sound: playbackObject} = await Audio.Sound.createAsync(
                require('../assets/audio/Unit1Lesson1a.mp3'),
                {shouldPlay: true}
            );
            setSound(playbackObject);

            // Set playback status update listener
            playbackObject.setOnPlaybackStatusUpdate(updateStatus);
        } catch (error) {
            console.error('Error loading sound:', error);
        }
    };

    // Function to track the playback status
    const updateStatus = (statusUpdate: any) => {
        if (statusUpdate.isLoaded) {
            setStatus(statusUpdate);

            if (!isSeeking && statusUpdate.positionMillis != null) {
                setSeekPosition(statusUpdate.positionMillis); // Update seek position as the audio plays
            }
        }
    };

    // useEffect(() => {
    //     return () => {
    //         if (sound) {
    //             sound.unloadAsync();
    //         }
    //     };
    // }, [sound]);

    useFocusEffect(
        useCallback(() => {
            return () => {
                if (sound) {
                    sound
                        .getStatusAsync()
                        .then((status) => {
                            if (status.isLoaded) {
                                sound.stopAsync(); // Stop the audio if it's loaded
                                sound.unloadAsync(); // Unload the sound to free up resources
                            }
                        })
                        .catch((error) => {
                            console.warn(
                                'Error stopping/unloading sound: ',
                                error
                            );
                        });
                }
            };
        }, [sound])
    );

    // Function to handle user interaction with the slider
    const onSeekSliderValueChange = async (value: number) => {
        if (sound && status?.isLoaded) {
            setIsSeeking(true);
            setSeekPosition(value);
        }
    };

    // Function to handle the end of user interaction with the slider
    const onSeekSliderComplete = async (value: number) => {
        if (sound && status?.isLoaded) {
            setIsSeeking(false);
            await sound.setPositionAsync(value); // Seek to the new position in milliseconds
        }
    };

    const pauseSound = async () => {
        if (sound) {
            await sound.pauseAsync();
        }
    };

    const resumeSound = async () => {
        if (sound) {
            await sound.playAsync();
        }
    };

    const stopSound = async () => {
        if (sound) {
            try {
                const currentStatus = await sound.getStatusAsync();
                if (currentStatus.isLoaded) {
                    await sound.stopAsync(); // Stop the audio
                }
            } catch (error) {
                console.error('Error stopping sound:', error);
            }
        }
    };

    return (
        <View>
            {status && status.isLoaded && (
                <View>
                    <Slider
                        style={{height: 40}}
                        minimumValue={0}
                        maximumValue={status.durationMillis || 1}
                        value={seekPosition}
                        onValueChange={onSeekSliderValueChange} // Track user interaction
                        onSlidingComplete={onSeekSliderComplete} // Seek when user releases slider
                        minimumTrackTintColor="#1FB28A"
                        maximumTrackTintColor="#D3D3D3"
                        thumbTintColor="#1FB28A"
                    />

                    <Text>Position: {Math.floor(seekPosition / 1000)}s</Text>
                    <Text>
                        Duration:{' '}
                        {Math.floor((status.durationMillis || 0) / 1000)}s
                    </Text>
                    <Text>Is Playing: {status.isPlaying ? 'Yes' : 'No'}</Text>
                </View>
            )}
            <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}
            >
                {/* <Button title="Play Sound" onPress={playSound} /> */}
                {/* <Button
                    title={seekPosition > 0 ? 'Resume' : 'Play'}
                    onPress={seekPosition > 0 ? resumeSound : playSound}
                /> */}
                <TouchableOpacity onPress={seekPosition > 0 ? resumeSound : playSound}>
                    <Ionicons name="play" color="black" size={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={pauseSound}>
                    <Ionicons name="pause" color="black" size={24} />
                </TouchableOpacity>
                {/* <Button title="Pause Sound" onPress={pauseSound} /> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({});
