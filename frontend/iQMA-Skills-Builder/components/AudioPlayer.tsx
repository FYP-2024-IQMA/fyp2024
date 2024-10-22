import {
    Button,
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {AuthContext} from '@/context/AuthContext';
import {Colors} from '@/constants/Colors';
import {useContext, useEffect, useState} from 'react';
import {Audio} from 'expo-av';

export const AudioPlayer = () => {
    const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
    const [isPlaying, setIsPlaying] = useState(false);

    // Function to load and play the sound
    const playSound = async () => {
        const {sound} = await Audio.Sound.createAsync(
            require('../assets/audio/Unit1Lesson1a.mp3') // Test audio file
        );
        setSound(sound);

        await sound.playAsync();
        setIsPlaying(true);
    };

    const pauseSound = async () => {
        if (sound && isPlaying) {
            await sound.pauseAsync();
            setIsPlaying(false);
        }
    };

    const stopSound = async () => {
        if (sound && isPlaying) {
            await sound.stopAsync();
            setIsPlaying(false);
        }
    };

    // useEffect(() => {
    //     return () => {
    //         if (sound) {
    //             sound.unloadAsync();
    //         }
    //     };
    // }, [sound]);

    return (
        <View>
            {/* <Button
                title={isPlaying ? 'Pause' : 'Play'}
                onPress={isPlaying ? pauseSound : playSound}
            /> */}
            <Button title="Play" onPress={playSound}></Button>
            <Button title="Pause" onPress={pauseSound}></Button>
            <Button title="Stop" onPress={stopSound} />
            {isPlaying ? <Text>Sound Playing</Text> : <Text>Sound Not Playing</Text>}
        </View>
    );
};

const styles = StyleSheet.create({});
