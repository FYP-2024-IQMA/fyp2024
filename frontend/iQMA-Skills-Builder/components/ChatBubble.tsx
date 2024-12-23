import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';

import {Colors} from '@/constants/Colors';

interface ChatBubbleProps {
    children: ReactNode;
    position: 'left' | 'right' | 'top';
    bubbleColor?: string;
    textColor?: string;
    isUser?: boolean;
    borderRadius?: number;
    showArrow?: boolean;
    chatbot?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
    children,
    position,
    bubbleColor = Colors.default.purple500,
    textColor = 'white',
    isUser,
    borderRadius = 10,
    showArrow = true,
    chatbot,
}) => {
    return (
        <View style={[styles.container, getContainerAlignment(position)]}>
            {showArrow && (
                <View
                    style={[styles.arrowContainer, getArrowContainer(position)]}
                >
                    <View
                        style={[styles.arrow, {borderBottomColor: bubbleColor}]}
                    />
                </View>
            )}
            <View style={[styles.bubbleWrapper, styles.alignLeft]}>
                {!isUser && (
                    <Image
                        source={require('@/assets/images/iqma_logo.png')}
                        style={styles.icon}
                    />
                )}
                <View
                    style={[
                        styles.bubble,
                        {backgroundColor: bubbleColor, borderRadius},
                    ]}
                >
                    <Text style={[styles.text, {color: textColor}]}>
                        {children}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const getContainerAlignment = (position: string): ViewStyle => {
    switch (position) {
        case 'right':
            return {alignItems: 'flex-end'};
        default:
            return {alignItems: 'flex-start'};
    }
};

const getArrowContainer = (position: string) => {
    switch (position) {
        case 'left':
            return {
                left: -5,
                bottom: 40,
                transform: [{rotate: '270deg'}],
            };
        case 'right':
            return {
                right: -5,
                top: 20,
                transform: [{rotate: '90deg'}],
            };
        default:
            return {
                top: -5,
                left: 20,
            };
    }
};

const styles = StyleSheet.create({
    bubbleWrapper: {
        flexDirection: 'row',
        // marginBottom: 20,
    },
    alignLeft: {
        justifyContent: 'flex-start',
    },
    alignRight: {
        justifyContent: 'flex-end',
    },
    container: {
        flexDirection: 'column',
        marginBottom: 20,
    },
    bubble: {
        maxWidth: '80%',
        position: 'relative',
        backgroundColor: Colors.default.purple500,
        padding: 20,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    text: {
        color: 'white',
        lineHeight: 20,
    },
    arrowContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    arrow: {
        width: 0,
        height: 0,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: Colors.default.purple500,
        marginBottom: -2,
        position: 'absolute',
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
});
