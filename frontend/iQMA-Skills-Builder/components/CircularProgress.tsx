// components/CircularProgress.tsx

import {StyleSheet, Text, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

import React from 'react';

interface CircularProgressProps {
    size: number;
    strokeWidth: number;
    progress: number;
    children?: React.ReactNode;
    style?: any;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
    size,
    strokeWidth,
    progress,
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <View style={styles.container}>
            <Svg width={size} height={size}>
                {/* outer grey circle */}
                <Circle
                    stroke="#E6E6E6"
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                {/* orange circle */}
                <Circle
                    stroke="#FFA726"
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    rotation="-90"
                    origin={`${size / 2}, ${size / 2}`}
                />
            </Svg>
            <Text style={styles.progressText}>{`${progress}%`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressText: {
        position: 'absolute',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default CircularProgress;
