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
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';

export const AudioPlayer = () => {

    const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync( require('../assets/audio/Unit1Lesson1a.mp3')
        );
        setSound(sound);
    
        console.log('Playing Sound');
        await sound.playAsync();
      }
    
      useEffect(() => {
        return sound
          ? () => {
              console.log('Unloading Sound');
              sound.unloadAsync();
            }
          : undefined;
      }, [sound]);
    
      return (
        <View>
          <Button title="Play Sound" onPress={playSound} />
        </View>
      );
    }

const styles = StyleSheet.create({
    
});
