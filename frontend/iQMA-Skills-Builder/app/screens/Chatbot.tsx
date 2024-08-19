// app/Chatbot.tsx

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChatBubble } from "@/components/ChatBubble";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { TextInput } from "react-native-gesture-handler";
import { useDrawerStatus } from '@react-navigation/drawer';
import { useNavigation } from "@react-navigation/native";

type DrawerParamList = {
    'Section 1: Communication': { chatId: string };
    'Section 2: Decision Making': { chatId: string };
    'Section 3: Developing People': { chatId: string };
};

// ensurees chatbot screen receives correct props
// use drawerscreenprops to type the props of chatbot screen
type ChatbotScreenProps = DrawerScreenProps<DrawerParamList, 'Section 1: Communication' | 'Section 2: Decision Making' | 'Section 3: Developing People' >;


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

    const isDrawerOpen = useDrawerStatus() === 'open';
    const navigation = useNavigation();

    const {chatId} = route.params;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
        {text: `Hello! How can I assist you with ${chatId}?`, isUser: false},
    ])

    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: { display: isDrawerOpen ? 'none' : 'flex',
                backgroundColor: '#7654F2',
                justifyContent: 'center',     
                alignItems: 'center',
                paddingHorizontal: 80,
                },
            });
    }, [isDrawerOpen]);

    
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
    
    // const conversation = [
    //     { text: `Hello! How can I assist you with ${chatId}?`, isUser: false },
    //     { text: `I need help with ${chatId}.`, isUser: true },
    //     { text: `Sure, what do you need to know about ${chatId}?`, isUser: false },
    //     { text: `I want to understand more about its features.`, isUser: true },
    //     { text: `Okay, let me explain the features of ${chatId}.`, isUser: false }
    // ];

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
            {messages.map((msg, index) => (
                <ChatBubble
                    key={index}
                    position={msg.isUser ? 'right' : 'left'}
                    bubbleColor={msg.isUser ? "#B199FF" : "#D1D5DB"}
                    textColor={msg.isUser ? "#000000" : "#000000"}
                    icon={!msg.isUser ? 'https://raw.githubusercontent.com/FYP-2024-IQMA/fyp2024/e00d20380b4bb7fe579fba92c177ba627066c070/iqma_logo.jpeg' : undefined}
                    borderRadius={20}  
                    showArrow={false}  
                    chatbot={true}
                >
                    {msg.text}
                </ChatBubble>
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
                    <View style={styles.sendButtonCircle}>
                        <AntDesign name="arrowup" size={24} color="#000000" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );

}


  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    chatContainer: {
        padding: 10,
        margin: 5
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
        paddingLeft: 30,
        backgroundColor: '#D1D5DB',
    },
    button: {
        justifyContent: 'center',
    },
    sendButtonCircle: {
        width: 40,
        height: 40,
        backgroundColor: '#B199FF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default ChatbotScreen;
