import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';

import {Colors} from '@/constants/Colors';
import React from 'react';

const screenWidth = Dimensions.get('window').width;

export const CustomButton = ({
    label = '',
    labelColor = Colors.default.purple500,
    backgroundColor = Colors.default.purple500,
    borderColor = Colors.default.purple500,
    onPressHandler = () => {},
    capitalise = true,
    disabled = false,
    isOption = false,
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
                        backgroundColor: disabled
                            ? Colors.chatbot.inputColor
                            : backgroundColor,
                        borderColor: borderColor,
                        paddingHorizontal: isOption ? 25 : undefined,
                        alignItems: isOption ? undefined : 'center',
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
    },
    button: {
        width: screenWidth * 0.9,
        marginVertical: 10,
        padding: 15,
        borderRadius: 10,
        borderWidth: 2,
        justifyContent: 'center',
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
