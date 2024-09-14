import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';

import React from 'react';

const screenWidth = Dimensions.get('window').width;

export const CustomButton = ({
    label = '',
    labelColor = '#7654F2',
    backgroundColor = '#7654F2',
    borderColor = '#7654F2',
    onPressHandler = () => {},
    capitalise = true,
    disabled = false,
}) => {
    const textStyle = capitalise ? 'uppercase' : 'none';

    return (
        <View
            style={[
                styles.buttonContainer,
                // !isQuiz && {justifyContent: 'flex-end'},
            ]}
        >
            <Pressable
                style={[
                    styles.button,
                    styles.rounded,
                    styles.shadow,
                    {
                        backgroundColor: disabled ? '#D1D5DB' : backgroundColor,
                        borderColor: borderColor,
                    },
                ]}
                onPress={onPressHandler}
                disabled={disabled}
            >
                <View>
                    <Text
                        style={[
                            styles.buttonText,
                            {
                                color: disabled ? '#A0A0A0' : labelColor,
                                textTransform: textStyle,
                            },
                        ]}
                    >
                        {label}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        // bottom: 20,
        // paddingBottom: 20,
    },
    button: {
        width: screenWidth * 0.8,
        marginVertical: 10,
        padding: 15,
        borderRadius: 10,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rounded: {
        borderRadius: 10,
    },
    buttonText: {
        fontWeight: 'bold',
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
});
