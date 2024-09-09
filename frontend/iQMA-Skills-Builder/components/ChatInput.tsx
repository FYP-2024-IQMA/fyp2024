import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {AntDesign} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '@/context/AuthContext';
import {ChatBubble} from '@/components/ChatBubble';
import {ChatDrawerParamList} from '@/components/ChatbotDrawer';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {Feather} from '@expo/vector-icons';
import {useDrawerStatus} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';

// import {TextInput} from 'react-native-gesture-handler';

interface ChatInputProps {
    handleSend: (message: string) => void;
}

// Getting response from chatbot -> to add examples and summarise
const getChatbotResponse = async (
    role: string,
    message: string,
    history?: Array<{role: string; content: string}>
) => {
    try {
        const response = await fetch(
            `http://${process.env.EXPO_PUBLIC_LOCALHOST_URL}:8000/generate`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    role: role,
                    content: message,
                    ...(history && {history}),
                }),
            }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error while getting chatbot response:', error);
    }
};

// Save chat history
const saveChatHistory = async (
    userId: string,
    sectionId: string,
    queryPair: {role: string; content: string}[]
) => {
    try {
        const body = {
            userID: userId,
            sectionID: sectionId,
            queryPair: queryPair,
        };

        const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/chat/createchathistory`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        console.log('Status: ', data.status);
    } catch (error) {
        console.error('Error while saving chat history:', error);
    }
};

const ChatInput: React.FC<ChatInputProps> = ({handleSend}) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{text: string; isUser: boolean}[]>(
        []
    );

    const onSend = () => {
        if (message.trim()) {
            handleSend(message.trim());
            setMessage(''); // Clear the input after sending
        }
    };
    return (
        <>
            <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Type your messsage..."
                onSubmitEditing={onSend}
                keyboardType="email-address"
            />
            <TouchableOpacity onPress={onSend} style={styles.button}>
                <View style={styles.sendButtonCircle}>
                    <Feather name="send" size={24} color="#000000" />
                </View>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
        paddingLeft: 30,
        backgroundColor: '#D1D5DB',
    },
    button: {
        justifyContent: 'center',
        padding: 5,
    },
    sendButtonCircle: {
        width: 40,
        height: 40,
        backgroundColor: '#B199FF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#FFFFFF',
    },
});

export default ChatInput;
