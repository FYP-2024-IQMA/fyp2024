import {Image, StyleSheet, Text, View, Modal} from 'react-native';
import React, {useState} from 'react';
import {CustomButton} from '@/components/CustomButton';
import { Option, Question } from '@/constants/Quiz';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const QuizCard: React.FC<{ questionData: Question, onNextQuestion: () => void}> = ({ questionData, onNextQuestion }) => {
    const { quizID, questionNo, question, option1, option2, option3, option4, answer } = questionData;
    const [selectedButton, setSelectedButton] = useState<Option | undefined>(undefined);
    const [selectedLabel, setSelectedLabel] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);

    const handleButtonPress = (label: string, option: Option) => {
        setSelectedButton(option);
        setSelectedLabel(label);
    };

    const handleCheck = () => {
        if (selectedButton) {
            if (selectedLabel == answer) {
                setIsCorrect(true);
            }
            setCount(count+1);
            setModalVisible(true);
        }
    };

    const handleAnswer = () => {
        if (isCorrect) {
            sendMessage();
            onNextQuestion();
            setCount(0);
        }
        setModalVisible(false);
        setIsCorrect(false);
        setSelectedButton(undefined);
    };

    const sendMessage = async () => {
        const userID = await AsyncStorage.getItem('userID');
        try {
            const response = await axios.post(
                `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/clickstream/sendMessage`, 
                {
                    "userID": userID,
                    "eventType": "attemptsTaken",
                    "event": `quizID ${quizID}, questionNo ${questionNo}`,
                    "timestamp": new Date().toISOString(),
                    "attempts": count
                }
            )
            console.log(response.data)
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <View>
            <Text
                style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#4143A3',
                    marginBottom: 10,
                }}
            >
                {question}
            </Text>

            <View style={{alignItems: 'center'}}>
                <CustomButton
                    label={option1.option}
                    labelColor={
                        selectedButton === option1 ? '#FFFFFF' : '#5C5776'
                    }
                    backgroundColor={
                        selectedButton === option1 ? '#7654F2' : '#FFFFFF'
                    }
                    borderColor={
                        selectedButton === option1 ? '#7654F2' : '#5C5776'
                    }
                    onPressHandler={() => handleButtonPress('option1', option1)}
                    capitalise={false}
                />
                <CustomButton
                    label={option2.option}
                    labelColor={
                        selectedButton === option2 ? '#FFFFFF' : '#5C5776'
                    }
                    backgroundColor={
                        selectedButton === option2 ? '#7654F2' : '#FFFFFF'
                    }
                    borderColor={
                        selectedButton === option2 ? '#7654F2' : '#5C5776'
                    }
                    onPressHandler={() => handleButtonPress('option2', option2)}
                    capitalise={false}
                />
                <CustomButton
                    label={option3.option}
                    labelColor={
                        selectedButton === option3 ? '#FFFFFF' : '#5C5776'
                    }
                    backgroundColor={
                        selectedButton === option3 ? '#7654F2' : '#FFFFFF'
                    }
                    borderColor={
                        selectedButton === option3 ? '#7654F2' : '#5C5776'
                    }
                    onPressHandler={() => handleButtonPress('option3', option3)}
                    capitalise={false}
                />
                <CustomButton
                    label={option4.option}
                    labelColor={
                        selectedButton === option4 ? '#FFFFFF' : '#5C5776'
                    }
                    backgroundColor={
                        selectedButton === option4 ? '#7654F2' : '#FFFFFF'
                    }
                    borderColor={
                        selectedButton === option4 ? '#7654F2' : '#5C5776'
                    }
                    onPressHandler={() => handleButtonPress('option4', option4)}
                    capitalise={false}
                />

                <View style={{marginTop: 50, marginBottom: 50}}>
                    <CustomButton
                        label="check"
                        labelColor="#18113C"
                        backgroundColor={selectedButton ? '#8CE5CB' : '#FFFFFF'}
                        borderColor={selectedButton ? '#8CE5CB' : '#5C5776'}
                        onPressHandler={handleCheck}
                    />
                </View>
            </View>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 10,
                            }}
                        >
                            <Image
                                source={
                                    isCorrect
                                        ? require('@/assets/images/correct.png')
                                        : require('@/assets/images/incorrect.png')
                                }
                                style={{marginRight: 8}}
                            />
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    color: isCorrect ? '#1ACB98' : '#E66A63',
                                }}
                            >
                                {isCorrect ? 'Correct' : 'Incorrect'}
                            </Text>
                        </View>
                        <Text style={{marginBottom: 10}}>
                            {selectedButton ? selectedButton!.explanation : ''}
                        </Text>
                        <View style={{alignItems: 'center'}}>
                            <CustomButton
                                label={isCorrect ? "continue" : "try again"}
                                labelColor={isCorrect ? "#18113C" : "#FFFFFF"}
                                backgroundColor={isCorrect ? '#8CE5CB' : '#E66A63'}
                                borderColor={isCorrect ? '#8CE5CB' : '#E66A63'}
                                onPressHandler={handleAnswer}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#D9D9D9',
        paddingTop: 20,
        paddingBottom: 20,
    },
    modalContent: {
        width: '100%',
        padding: 20,
    },
});
