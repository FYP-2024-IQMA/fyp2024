import * as chatInputFunctions from '@/components/ChatInput';

import {
    Alert,
    Keyboard,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';

import {AuthContext} from '@/context/AuthContext';
import {ChatBubble} from '@/components/ChatBubble';
import ChatInput from '@/components/ChatInput';

interface QuizItem {
    answer: string | null;
    isSelfReflection: boolean;
    option1: object | null;
    option2: object | null;
    option3: object | null;
    option4: object | null;
    question: string;
    questionNo: number;
    quizID: number;
}

interface MiniChatbotProps {
    onChatHistoryUpdate: (length: number) => void;
}

//get reflection qn from backend
const reflectionQuestion = async (sectionID: string, unitID: string) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/quiz/getquestions/${sectionID}/${unitID}`;
        const response = await fetch(url);
        const data = await response.json();
        const reflectionQn = data.filter(
            (item: QuizItem) => item.isSelfReflection
        );

        return reflectionQn[0].question;
    } catch (error) {
        console.error('Error while getting reflection question:', error);
    }
};

const MiniChatbot: React.FC<MiniChatbotProps> = ({onChatHistoryUpdate}) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{text: string; isUser: boolean}[]>(
        []
    );
    const {currentUser, isLoading} = useContext(AuthContext);
    const [reflectionQn, setReflectionQn] = useState<string>('');
    const scrollViewRef = useRef<ScrollView>(null);

    const sectionID = 'SEC0001';
    const unitID = 'UNIT0002';

    const loadUnitChatHistory = async (
        userId: string,
        sectionId: string,
        unitId: string
    ) => {
        try {
            const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/chat/getchathistory/${userId}/${sectionId}/${unitId}`;

            const response = await fetch(url);
            const chatHistory = await response.json();

            if (chatHistory.length == 0) {
                await chatInputFunctions.saveChatHistory(
                    currentUser.sub,
                    sectionID,
                    unitID,
                    [
                        {
                            role: 'assistant',
                            content: reflectionQn,
                        },
                    ]
                );

                setMessages([
                    {
                        text: reflectionQn,
                        isUser: false,
                    },
                ]);
            } else {
                const formattedChatHistory = chatHistory.flatMap(
                    (item: {queryPair: {role: string; content: string}[]}) =>
                        item.queryPair.map((message) => ({
                            text: message.content,
                            isUser: message.role === 'user',
                        }))
                );
                setMessages(formattedChatHistory);
                onChatHistoryUpdate(formattedChatHistory.length);
                return formattedChatHistory;
            }
        } catch (error) {
            console.error('Error while loading chat history:', error);
        }
    };

    // handle user input
    const handleSend = async (message: string) => {
        const userMessage = {text: message, isUser: true};
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setMessage('');

        // get past messages
        const history = newMessages.map((msg) => ({
            role: msg.isUser ? 'user' : 'assistant',
            content: msg.text,
        }));

        const response = await chatInputFunctions.getChatbotResponse(
            'user',
            message,
            history
        );

        if (response) {
            // Add the chatbot response to the chat
            const botReply = {text: response.content, isUser: false};
            const updatedMessages = [...newMessages, botReply];
            setMessages(updatedMessages);
            onChatHistoryUpdate(updatedMessages.length);

            const queryPair = [
                {role: 'user', content: message},
                {role: 'assistant', content: response.content},
            ];

            scrollViewRef.current?.scrollToEnd({animated: true});

            chatInputFunctions.saveChatHistory(
                currentUser.sub,
                sectionID,
                unitID,
                queryPair
            );
        }
    };

    useEffect(() => {
        if (sectionID && unitID) {
            (async () => {
                const response = await reflectionQuestion(sectionID, unitID);
                setReflectionQn(response);
            })();
        }
    }, [sectionID, unitID]);

    useEffect(() => {
        if (reflectionQn) {
            loadUnitChatHistory(currentUser.sub, sectionID, unitID);
        }
    }, [reflectionQn, sectionID, unitID]);
    return (
        <>
            <View style={styles.container}>
                <View style={styles.purpleBox}>
                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={styles.chatContainer}
                        onContentSizeChange={() =>
                            scrollViewRef.current?.scrollToEnd({
                                animated: true,
                            })
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
