import * as Progress from 'react-native-progress';

import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';

import {Colors} from '@/constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import React from 'react';
import {router} from 'expo-router';

const {width: screenWidth} = Dimensions.get('window');

interface ProgressBarProps {
    progress: number;
    isQuestionnaire: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    isQuestionnaire,
}) => {
    const handlePress = () => {
        router.replace('Home');
    };

    const progressBarWidth = isQuestionnaire ? screenWidth * 0.75 : screenWidth * 0.50;

    return (
        <View style={styles.container}>
            <Progress.Bar
                progress={progress}
                // width={isQuestionnaire ? 300 : 270}
                width={progressBarWidth}
                color={Colors.default.purple500}
            />
            {/* need to change to an icon */}
            {/* {!isQuestionnaire && (
                <TouchableOpacity onPress={handlePress}> */}
                    {/* <Ionicons name="close" size={24} color="black" style={{marginLeft: 30}} /> */}
                    {/* <Ionicons
                        name="home"
                        size={24}
                        color="black"
                        style={{marginLeft: 30}}
                    />
                </TouchableOpacity>
            )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        // alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 20,
        marginLeft: 20,
        color: '#000',
    },
});

export default ProgressBar;
