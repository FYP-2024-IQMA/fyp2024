// app/Chatbot.tsx

import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
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
import {TextInput} from 'react-native-gesture-handler';
import {useDrawerStatus} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';

const sectionMapping: {[key: string]: string} = {
    SEC0001: 'Section 1: Communication',
    SEC0002: 'Section 2: Decision Making',
    SEC0003: 'Section 3: Developing People',
};

// ensurees chatbot screen receives correct props
// use drawerscreenprops to type the props of chatbot screen
// type ChatbotScreenProps = DrawerScreenProps<DrawerParamList, 'Section 1: Communication' | 'Section 2: Decision Making' | 'Section 3: Developing People' >;

type ChatbotScreenProps = DrawerScreenProps<
    ChatDrawerParamList,
    keyof ChatDrawerParamList
>;

// Getting response from chatbot
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

// Load chat history
const loadChatHistory = async (userId: string, sectionId: string) => {
    console.log('LOAD CHAT HISTORY');

    try {
        const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/chat/getchathistory/${userId}/${sectionId}`;

        const response = await fetch(url);

        const chatHistory = await response.json();

        const formattedChatHistory = chatHistory.flatMap(
            (item: {queryPair: {role: string; content: string}[]}) =>
                item.queryPair.map((message) => ({
                    text: message.content,
                    isUser: message.role === 'user',
                }))
        );

        const fixedResponse = [
            {
                isUser: false,
                text: `Hello! How can I assist you with ${sectionMapping[sectionId]}?`,
            },
        ];

        return formattedChatHistory.length > 0
            ? fixedResponse.concat(formattedChatHistory, fixedResponse)
            : fixedResponse;
    } catch (error) {
        console.error('Error while loading chat history:', error);
    }
};

// Clear chat history
const clearChatHistory = async (chatId: string) => {
    try {
        await AsyncStorage.removeItem(chatId).then(() =>
            console.log('Chat history for chatId: "', chatId, '", cleared')
        );
    } catch (error) {
        console.error('Error while clearing chat history:', error);
    }
};

// Main Chat component
const ChatbotScreen: React.FC<ChatbotScreenProps> = ({route, navigation}) => {
    const {currentUser, isLoading} = useContext(AuthContext);

    const isDrawerOpen = useDrawerStatus() === 'open';
    // const navigation = useNavigation();

    const {sectionID} = route.params;

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{text: string; isUser: boolean}[]>(
        []
    );

    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: isDrawerOpen ? 'none' : 'flex',
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
            const history = await loadChatHistory(currentUser.sub, sectionID);
            setMessages(history!);
        };
        loadHistory();
    }, [sectionID]);

    // Alert Function for deleting chat history
    const deleteAlert = () => {
        Alert.alert(
            'Clearing Chat History',
            'Are you sure you want to clear the chat history?',
            [
                {
                    text: 'Cancel',
                    onPress: () =>
                        console.log('Delete chat history cancelled.'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            await clearChatHistory(sectionID);
                            const loadHistory = async () => {
                                const history = await loadChatHistory(
                                    currentUser.sub,
                                    sectionID
                                );
                                setMessages(history!);
                            };
                            loadHistory();
                        } catch (error) {
                            console.error(
                                'Error while clearing chat history:',
                                error
                            );
                        }
                    },
                },
            ],
            {cancelable: true}
        );
    };

    // handle user input
    const handleSend = async () => {
        const userMessage = {text: message, isUser: true};
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setMessage('');

        // get past messages
        const history = newMessages.map((msg) => ({
            role: msg.isUser ? 'user' : 'assistant',
            content: msg.text,
        }));

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

            saveChatHistory(currentUser.sub, sectionID, queryPair);
        }
    };

    if (!sectionID) {
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
                <TouchableOpacity onPress={deleteAlert} style={styles.button}>
                    <View style={styles.deleteButtonCircle}>
                        <AntDesign name="delete" size={24} color="#000000" />
                    </View>
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type your messsage..."
                    onSubmitEditing={handleSend}
                    keyboardType="email-address"
                />
                <TouchableOpacity onPress={handleSend} style={styles.button}>
                    <View style={styles.sendButtonCircle}>
                        <Feather name="send" size={24} color="#000000" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    chatContainer: {
        padding: 10,
        margin: 5,
    },
    inputContainer: {
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
        padding: 5,
    },
    deleteButtonCircle: {
        width: 40,
        height: 40,
        backgroundColor: '#FF6961',
        borderRadius: 20,
        justifyContent: 'center',
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
});
export default ChatbotScreen;
