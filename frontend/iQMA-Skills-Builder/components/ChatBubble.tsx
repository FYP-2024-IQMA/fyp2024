import React, { ReactNode } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

interface ChatBubbleProps {
    children: ReactNode;
    position: 'left' | 'right';
    bubbleColor?: string; 
    textColor?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ children, position, bubbleColor = "#7654F2", textColor = "white" }) => {
    return (
        <View style={[styles.container, getContainerAlignment(position)]}>
            <View style={[styles.arrowContainer, getArrowContainer(position)]}>
                <View style={styles.arrow} />
            </View>
            <View style={styles.bubble}>
                <Text style={styles.text}>{children}</Text>
            </View>
        </View>
    );
};

const getContainerAlignment = (position: string): ViewStyle => {
    switch (position) {
        case 'right':
            return { alignItems: 'flex-end' };
        default:
            return { alignItems: 'flex-start' };
    }
};

const getArrowContainer = (position: string) => {
    switch (position) {
        case 'left':
            return { 
                left: -5,
                bottom: 40,
                transform: [{ rotate: '270deg' }]
            };
        case 'right':
            return {
                right: -5,
                top: 20,
                transform: [{ rotate: '90deg' }]
            };
        default:
            return { 
                top: -5, 
                left: 20 
            };
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginBottom: 20,
    },
    bubble: {
        // maxWidth: '80%',
        position: 'relative',
        backgroundColor: '#7654F2',
        padding: 20,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    text: {
        color: "white",
        textAlign: 'center',
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
        borderBottomColor: '#7654F2',
        marginBottom: -2,
        position: 'absolute',
    },
});