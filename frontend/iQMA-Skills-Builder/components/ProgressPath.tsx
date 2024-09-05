import {StyleSheet, Text, Touchable, View} from 'react-native';

import {AntDesign} from '@expo/vector-icons';
import CircularProgress from './CircularProgress';
import React from 'react';
import StartLabel from './startLabel';
import {TouchableOpacity} from 'react-native';

interface ProgressItemProps {
    iconName: any;
    iconColor?: string;
    iconSize?: number;
    position?: 'left' | 'right';
    status: string;
    progress?: number;
    onPress?: () => void;
}

const ProgressItem: React.FC<ProgressItemProps> = ({
    iconName,
    iconColor = 'black',
    iconSize = 24,
    position = 'left',
    status,
    progress = 0,
    onPress,
}) => {
    const getColors = () => {
        switch (status) {
            case 'not-started':
                return {
                    progressItemColor: '#D3D3D3',
                    darkerProgressItemColor: '#A9A9A9',
                };

            default:
                return {
                    progressItemColor: '#B199FF',
                    darkerProgressItemColor: '#AE8BF1',
                };
        }
    };

    const {progressItemColor, darkerProgressItemColor} = getColors();

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.itemContainer,
                position === 'left'
                    ? styles.leftContainer
                    : styles.rightContainer,
            ]}
        >
            {/* <StartLabel /> */}
            {status === 'in-progress' && (
                <StartLabel style={styles.startText} />
            )}
            <View style={styles.progressWrapper}>
                {status === 'in-progress' && (
                    <>
                        {/* <StartLabel /> */}
                        <CircularProgress
                            size={101}
                            strokeWidth={5}
                            progress={progress}
                            style={styles.circularProgress}
                        />
                    </>
                )}
                <View
                    style={[
                        styles.darkerProgressItem,
                        {backgroundColor: darkerProgressItemColor},
                    ]}
                >
                    <AntDesign
                        name={iconName}
                        color={iconColor}
                        size={iconSize}
                    />
                </View>
                <View
                    style={[
                        styles.progressItem,
                        {backgroundColor: progressItemColor},
                    ]}
                >
                    <AntDesign
                        name={iconName}
                        color={iconColor}
                        size={iconSize}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

interface ProgressPathProps {
    icons: {
        name: string;
        color?: string;
        size?: number;
        status: string;
    }[];
    circularProgress?: number;
}

// higher level
const ProgressPath: React.FC<ProgressPathProps> = ({
    icons,
    circularProgress,
}) => {
    return (
        <View style={styles.progressContainer}>
            {icons.map((icon, index) => (
                <ProgressItem
                    key={index}
                    iconName={icon.name}
                    iconColor={icon.color}
                    iconSize={icon.size}
                    position={index % 2 === 0 ? 'left' : 'right'}
                    status={icon.status}
                    progress={circularProgress}
                    onPress={() => console.log('Pressed')}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        marginBottom: 20,
    },
    startText: {
        position: 'absolute',
        top: -20,
        left: 10,
        zIndex: 3,
    },
    progressWrapper: {
        position: 'relative',
        width: 85,
        height: 85,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    circularProgress: {
        position: 'absolute',
    },
    progressContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 15,
    },
    progressItem: {
        position: 'absolute',
        borderRadius: 30,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: 75,
        height: 70,
        zIndex: 2,
    },
    darkerProgressItem: {
        position: 'absolute',
        borderRadius: 30,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: 75,
        height: 70,
        zIndex: 1,
        transform: [{translateY: 5}],
    },
    leftContainer: {
        alignItems: 'flex-start',
        marginLeft: 60,
    },
    rightContainer: {
        alignItems: 'flex-end',
        marginRight: 60,
    },
});
export default ProgressPath;
