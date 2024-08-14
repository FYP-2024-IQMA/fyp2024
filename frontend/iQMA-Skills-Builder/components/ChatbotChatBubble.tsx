import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

type ChatBubbleProps = {
    text: string;
    isUser: boolean;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, isUser }) => {
    return (
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
            <Text style={isUser ? styles.userText : styles.botText}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    bubble: {
        padding: 15,
        borderRadius: 20,
        marginVertical: 5,
        maxWidth: '80%',
        alignItems: 'center',
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#8A2BE2',
    },
    botBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#D3CCE3',

    },
    botText: {
        color: '#000',
        lineHeight: 25,

    },
    userText: {
        color: '#FFFFFF',
        lineHeight: 25,
    }
});

export default ChatBubble;
