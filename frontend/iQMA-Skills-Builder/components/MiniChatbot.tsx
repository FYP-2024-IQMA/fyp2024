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
import ChatInput from '@/components/ChatInput';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {Feather} from '@expo/vector-icons';
import {useDrawerStatus} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';

// import {TextInput} from 'react-native-gesture-handler';

// Getting response from chatbot -> to add examples and summarise
// const getChatbotResponse = async (
//     role: string,
//     message: string,
//     history?: Array<{role: string; content: string}>
// ) => {
//     try {
//         const response = await fetch(
//             `http://${process.env.EXPO_PUBLIC_LOCALHOST_URL}:8000/generate`,
//             {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     role: role,
//                     content: message,
//                     ...(history && {history}),
//                 }),
//             }
//         );
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error while getting chatbot response:', error);
//     }
// };

// Save chat history
// const saveChatHistory = async (
//     userId: string,
//     sectionId: string,
//     queryPair: {role: string; content: string}[]
// ) => {
//     try {
//         const body = {
//             userID: userId,
//             sectionID: sectionId,
//             queryPair: queryPair,
//         };

//         console.log(body);
//         console.log('inside savechathistory function in mini');
//         const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/chat/createchathistory`;

//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(body),
//         });

//         const data = await response.json();

//         console.log('Status: ', data.status);
//     } catch (error) {
//         console.error('Error while saving chat history:', error);
//     }
// };

const MiniChatbot: React.FC = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{text: string; isUser: boolean}[]>(
        []
    );
    const {currentUser, isLoading} = useContext(AuthContext);
    const sectionID = 'SEC0001';

    // handle user input
    const handleSend = async (message: string) => {
        console.log('in minichatbot handlesend');
        console.log(message);
        const userMessage = {text: message, isUser: true};
        console.log(userMessage);
        const newMessages = [...messages, userMessage];
        // console.log('newmessages');
        // console.log(newMessages);
        setMessages(newMessages);
        setMessage('');

        // get past messages
        const history = newMessages.map((msg) => ({
            role: msg.isUser ? 'user' : 'assistant',
            content: msg.text,
        }));
        console.log(history);

        // const response = await getChatbotResponse('user', message, history);
        const response = {
            role: 'system',
            content: 'hello i am cookie brave',
        };
        if (response) {
            // Add the chatbot response to the chat
            const botReply = {text: response.content, isUser: false};
            const updatedMessages = [...newMessages, botReply];
            setMessages(updatedMessages);
            // Save the chat history

            const queryPair = [
                {role: 'user', content: message},
                {role: 'assistant', content: response.content},
            ];

            // saveChatHistory(currentUser.sub, sectionID, queryPair);
        }
    };
    return (
        <>
            <View style={styles.container}>
                <View style={styles.purpleBox}>
                    <ScrollView contentContainerStyle={styles.chatContainer}>
                        {messages.map((msg, index) => (
                            <ChatBubble
                                key={index}
                                position={msg.isUser ? 'right' : 'left'}
                                bubbleColor={msg.isUser ? '#B199FF' : '#D1D5DB'}
                                textColor={msg.isUser ? '#000000' : '#000000'}
                                isUser={msg.isUser}
                                borderRadius={20}
                                showArrow={false}
                                chatbot={true}
                            >
                                {msg.text}
                            </ChatBubble>
                        ))}
                    </ScrollView>
                    <View style={styles.inputContainer}>
                        <ChatInput handleSend={handleSend} />
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#FFFFFF',
    },
    chatContainer: {
        padding: 10,
        margin: 5,
        // width: 600,
    },
    purpleBox: {
        height: 450,
        borderWidth: 1,
        borderColor: '#C3B1FF',
        width: '95%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    sendButtonCircle: {
        width: 40,
        height: 40,
        backgroundColor: '#B199FF',
        borderRadius: 20,
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
});

export default MiniChatbot;
