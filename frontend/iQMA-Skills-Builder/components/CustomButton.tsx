import React from 'react';
import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const CustomButton = ({
    label = '',
    labelColor = '#7654F2',
    backgroundColor = '#7654F2',
    borderColor = '#7654F2',
    onPressHandler = () => {},
}) => {
    return (
        <View>
            <Pressable
                style={[
                    styles.button,
                    styles.rounded,
                    styles.shadow,
                    {
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,
                    },
                ]}
                onPress={onPressHandler}
            >
                <View>
                    <Text style={[styles.buttonText, {color: labelColor}]}>
                        {label}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        width: screenWidth * 0.8,
        marginTop: 10,
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
        textTransform: 'uppercase',
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
