import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';

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

// Getting response from chatbot -> to add examples and summarise
const getChatbotResponse = async (
    role: string,
    message: string,
    history?: Array<{role: string; content: string}>
) => {
    try {
        // const response = await fetch(`http://10.0.2.2:8000/generate`, {

        const response = await fetch(`http://10.0.2.2:8000/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                role: role,
                content: message,
                ...(history && {history}),
            }),
        });
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

        console.log(body);
        console.log('inside savechathistory function in mini');
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

//get reflection qn from backend
const reflectionQuestion = async (
    sectionID: string,
    unitID: string,
    lessonID: string
) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/getquestions/${sectionID}/${unitID}/${lessonID}}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log('refkectuib qb', data);
        return data;
    } catch (error) {
        console.error('Error while getting reflection question:', error);
    }
};

const MiniChatbot: React.FC = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{text: string; isUser: boolean}[]>(
        []
    );
    const {currentUser, isLoading} = useContext(AuthContext);
    const scrollViewRef = useRef<ScrollView>(null);

    const sectionID = 'SEC0001';
    const lessonID = '4c';
    const unitID = 'UNI0001';

    // handle user input
    const handleSend = async (message: string) => {
        console.log('in minichatbot handlesend');
        console.log(message);
        const userMessage = {text: message, isUser: true};
        console.log(userMessage);
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setMessage('');

        // get past messages
        const history = newMessages.map((msg) => ({
            role: msg.isUser ? 'user' : 'assistant',
            content: msg.text,
        }));
        console.log(history);

        const response = await getChatbotResponse('user', message, history);

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

            scrollViewRef.current?.scrollToEnd({animated: true});

            // saveChatHistory(currentUser.sub, sectionID, queryPair);
        }
    };

    useEffect(() => {
        if (sectionID && lessonID && unitID) {
            async () => {
                const response = await reflectionQuestion(
                    sectionID,
                    unitID,
                    lessonID
                );
                console.log(response);
                setMessages([response]);
            };
        }
    }, [sectionID, lessonID, unitID]);
    return (
        <>
            <View style={styles.container}>
                <View style={styles.purpleBox}>
                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={styles.chatContainer}
                        onContentSizeChange={() =>
                            scrollViewRef.current?.scrollToEnd({animated: true})
                        }
                    >
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
        flexGrow: 1,
        width: '100%',
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    purpleBox: {
        height: 450,
        borderWidth: 1,
        borderColor: '#C3B1FF',
        width: '98%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
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
