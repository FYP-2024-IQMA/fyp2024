// app/Chatbot.tsx

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChatBubble } from "@/components/ChatBubble";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { TextInput } from "react-native-gesture-handler";

type DrawerParamList = {
    'Decision Making': { chatId: string };
    'Creative Thinking': { chatId: string };
    'Problem Solving': { chatId: string };
};

// ensurees chatbot screen receives correct props
// use drawerscreenprops to type the props of chatbot screen
type ChatbotScreenProps = DrawerScreenProps<DrawerParamList, 'Decision Making' | 'Creative Thinking' | 'Problem Solving' >;

// Useful Methods

// Getting response from chatbot
const getChatbotResponse = async (role: string, 
    message: string,
    history?: Array<{role: string, content: string}>) => {
    try {
        const response = await fetch(`http://10.0.2.2:8000/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                role: role, 
                content: message,
                ...(history && { history }),
            }),
        });
        const data = await response.json();
        return data;
        } catch (error) {
            console.error('Error while getting chatbot response:', error);
        }
    };

// Save chat history
const saveChatHistory = async (chatId: string, newMessage: { role: string, content: string}) => {
    try {
        // retrieve existing chat history if it exists
        const existingChatHistory = await AsyncStorage.getItem(chatId);
        let chatHistory = existingChatHistory ? JSON.parse(existingChatHistory) : [{
            'role' : `assistant`, 
            'content' : `Hello! How can I assist you with ${chatId}?`
        }];
        // append to chat history
        chatHistory.push(newMessage);
        // save chat history to async storage
        const JsonString = JSON.stringify(chatHistory);
        await AsyncStorage.setItem(chatId, JsonString);
    } catch (error) {
        console.error('Error while saving chat history:', error);
    }
};

// Load chat history
const loadChatHistory = async (chatId: string) => {
    try {
        const chatHistory = await AsyncStorage.getItem(chatId);
        return chatHistory ? JSON.parse(chatHistory) : [{
            'role' : `assistant`, 
            'content' : `Hello! How can I assist you with ${chatId}?`
        }];
    } catch (error) {
        console.error('Error while loading chat history:', error);
    }
};

// Main Chat component
const ChatbotScreen: React.FC<ChatbotScreenProps> = ({ route }) => {
    const {chatId} = route.params;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
        {text: `Hello! How can I assist you with ${chatId}?`, isUser: false},
    ])

    // Load chat history
    useEffect(() => {
        const loadHistory = async () => {
            const history = await loadChatHistory(chatId);
            setMessages(history.map((message: { role: string, content: string }) => ({
                text: message.content,
                isUser: message.role === 'user',
            })));
        };
        loadHistory();
    }, [chatId]);

    // handle user input
    const handleSend = async () => {
        const userMessage = { text: message, isUser: true };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setMessage('');
        
        // get past messages
        const history = newMessages.map((msg) => ({
            role: msg.isUser ? 'user' : 'assistant',
            content: msg.text,
        }));

        const response = await getChatbotResponse('user', message, history);
        // console.log('Message to send: ', message);
        // console.log('Response from pressing Send: ', response);
        if (response) {
            // Add the chatbot response to the chat
            const botReply = { text: response.content, isUser: false };
            const updatedMessages = [...newMessages, botReply];
            setMessages(updatedMessages);
            // Save the chat history
            saveChatHistory(chatId, { role: 'user', content: message });
            saveChatHistory(chatId, { role: 'assistant', content: response.content });
          }
    };

    if (!chatId) {
        return (
          <View style={styles.container}>
            <Text>No chat selected</Text>
          </View>
        );
      }
      return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.chatContainer}>
                {messages.map((msg,index) => (
                    <ChatBubble key={index} position={msg.isUser ? 'right' : 'left'}>{msg.text}</ChatBubble>
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} 
                value={message} 
                onChangeText={setMessage} 
                placeholder="Type your messsage..."
                onSubmitEditing={handleSend}
                keyboardType="email-address"/> 
                <TouchableOpacity onPress={handleSend} style={styles.button}>
                    <AntDesign name="upcircle" size={24} color="#8A2BE2" />
                </TouchableOpacity>
            </View>
        </View>
    );

}


  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    chatContainer: {
        padding: 10,
    },
    inputContainer:{
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#FFFFFF',
    },
    input: {
        flex: 1,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
    },
    button: {
        justifyContent: 'center',
    }
});
export default ChatbotScreen;
