import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';
import {router} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';

interface ProgressBarProps {
    progress: number;
    isQuestionnaire: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    isQuestionnaire,
}) => {
    // const screenWidth = Dimensions.get("window").width;
    // const padding = 20;
    // const progressBarWidth = screenWidth - 2 * padding - 30;

    const handlePress = () => {
        router.replace('Home');
    };

    return (
        <View style={styles.container}>
            <Progress.Bar
                progress={progress}
                width={isQuestionnaire ? 300 : 270}
                color={'#7654F2'}
            />
            {/* need to change to an icon */}
            {!isQuestionnaire && (
                <TouchableOpacity onPress={handlePress}>
                    {/* <Ionicons name="close" size={24} color="black" style={{marginLeft: 30}} /> */}
                    <Ionicons
                        name="home"
                        size={24}
                        color="black"
                        style={{marginLeft: 30}}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 20,
        marginLeft: 20,
        color: '#000',
    },
});

export default ProgressBar;
