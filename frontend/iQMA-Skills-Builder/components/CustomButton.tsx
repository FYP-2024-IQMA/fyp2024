import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import React, { useEffect, useState } from 'react';

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
    isScroll = false,
    isChatButton = false,
}) => {
    const textStyle = capitalise ? 'uppercase' : 'none';
    const [timeLeft, setTimeLeft] = useState(isChatButton ? 60 : 0);
    const [buttonText, setButtonText] = useState(isChatButton ? 'Continue' : label);
    const [buttonBgColor, setButtonBgColor] = useState(backgroundColor);
    const [textColor, setTextColor] = useState(labelColor);

    useEffect(() => {
        if (isChatButton && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => {
                    console.log(`Time left: ${prevTime - 1}s`);
                    return prevTime - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        } else if (isChatButton && timeLeft === 0) {
            // setButtonText('Attempt Assessment');
            setButtonText('Finish Unit');
            setButtonBgColor(Colors.default.purple500);
            setTextColor('white');
        }
    }, [isChatButton, timeLeft]);

    return (
        <View
            style={[
                styles.buttonContainer,
                isScroll && { marginBottom: 40, marginTop: 20 },
            ]}
        >
            <Pressable
                style={[
                    styles.button,
                    styles.rounded,
                    styles.shadow,
                    {
                        backgroundColor: disabled ? Colors.chatbot.inputColor : (isChatButton && timeLeft === 0 ? buttonBgColor : backgroundColor),
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
                                color: disabled ? '#A0A0A0' : (isChatButton && timeLeft === 0 ? textColor : labelColor),
                                textTransform: textStyle,
                            },
                        ]}
                    >
                        {buttonText}
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
        width: '100%',
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
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
});
