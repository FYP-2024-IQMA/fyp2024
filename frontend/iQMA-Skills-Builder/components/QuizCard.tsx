import {Image, Modal, StyleSheet, Text, View} from 'react-native';
import {Option, Question} from '@/constants/Quiz';
import React, {useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '@/constants/Colors';
import {CustomButton} from '@/components/CustomButton';
import axios from 'axios';
import {criticallyDampedSpringCalculations} from 'react-native-reanimated/lib/typescript/reanimated2/animation/springUtils';

export const QuizCard: React.FC<{
    sectionID: string,
    questionData: Question;
    onNextQuestion: () => void;
}> = ({sectionID, questionData, onNextQuestion}) => {
    const {
        quizID,
        questionNo,
        question,
        option1,
        option2,
        option3,
        option4,
        answer,
    } = questionData;
    const [selectedButton, setSelectedButton] = useState<Option | undefined>(
        undefined
    );
    const [selectedLabel, setSelectedLabel] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [totalPoints, setTotalPoints] = useState<number>(0);
    const [currentPoints, setCurrentPoints] = useState<number>(0);

    const handleButtonPress = (label: string, option: Option) => {
        setSelectedButton(option);
        setSelectedLabel(label);
    };

    const handleCheck = () => {
        if (selectedButton) {
            if (selectedLabel == answer) {
                let points = 0;

                if (count == 0) {
                    points = 100; // First try
                } else if (count == 1) {
                    points = 50; // Second try
                } else {
                    points = 25; // Third or more tries
                }

                setCurrentPoints(points);
                setIsCorrect(true);
            }
            setCount((prevCount) => prevCount + 1);
            setModalVisible(true);
        }
    };

    const handleAnswer = async () => {
        if (isCorrect) {
            // Accumulate total points
            const newTotalPoints = totalPoints + currentPoints;
            setTotalPoints(newTotalPoints);
            await storeTotalPoints();

            onNextQuestion();
            setCount(0);
        }
        setModalVisible(false);
        setIsCorrect(false);
        setSelectedButton(undefined);
    };

    const storeTotalPoints = async () => {
        try {
            let storedPoints = await AsyncStorage.getItem('totalPoints');
            if (storedPoints !== null) {
                console.log('stored points in STP: ' + storedPoints);
                let storedPointsInNum = parseInt(storedPoints);
                console.log('the current points IN STP: ' + currentPoints);
                storedPointsInNum += currentPoints;

                await AsyncStorage.setItem(
                    'totalPoints',
                    storedPointsInNum.toString()
                );
            } else {
                await AsyncStorage.setItem(
                    'totalPoints',
                    currentPoints.toString()
                );
            }
        } catch (e) {
            console.error(e);
        }
    };
    const sendMessage = async () => {
        const userID = await AsyncStorage.getItem('userID');
        try {
            const response = await axios.post(
                `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/clickstream/sendMessage`,
                {
                    userID: userID,
                    eventType: 'attemptsTaken',
                    timestamp: new Date().toISOString(),
                    sectionID: sectionID,
                    quizID: quizID,
                    questionNo: questionNo,
                    attempts: count,
                }
            );
            console.log(response.data);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View>
            <Text
                style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: Colors.header.color,
                    marginBottom: 10,
                }}
            >
                {question}
            </Text>

            <View style={{alignItems: 'center'}}>
                <CustomButton
                    label={option1.option}
                    labelColor={
                        selectedButton === option1
                            ? Colors.light.background
                            : Colors.default.optionText
                    }
                    backgroundColor={
                        selectedButton === option1
                            ? Colors.default.purple500
                            : Colors.light.background
                    }
                    borderColor={
                        selectedButton === option1
                            ? Colors.default.purple500
                            : Colors.default.optionText
                    }
                    onPressHandler={() => handleButtonPress('option1', option1)}
                    capitalise={false}
                    isOption={true}
                />
                <CustomButton
                    label={option2.option}
                    labelColor={
                        selectedButton === option2
                            ? Colors.light.background
                            : Colors.default.optionText
                    }
                    backgroundColor={
                        selectedButton === option2
                            ? Colors.default.purple500
                            : Colors.light.background
                    }
                    borderColor={
                        selectedButton === option2
                            ? Colors.default.purple500
                            : Colors.default.optionText
                    }
                    onPressHandler={() => handleButtonPress('option2', option2)}
                    capitalise={false}
                    isOption={true}
                />
                <CustomButton
                    label={option3.option}
                    labelColor={
                        selectedButton === option3
                            ? Colors.light.background
                            : Colors.default.optionText
                    }
                    backgroundColor={
                        selectedButton === option3
                            ? Colors.default.purple500
                            : Colors.light.background
                    }
                    borderColor={
                        selectedButton === option3
                            ? Colors.default.purple500
                            : Colors.default.optionText
                    }
                    onPressHandler={() => handleButtonPress('option3', option3)}
                    capitalise={false}
                    isOption={true}
                />
                <CustomButton
                    label={option4.option}
                    labelColor={
                        selectedButton === option4
                            ? Colors.light.background
                            : Colors.default.optionText
                    }
                    backgroundColor={
                        selectedButton === option4
                            ? Colors.default.purple500
                            : Colors.light.background
                    }
                    borderColor={
                        selectedButton === option4
                            ? Colors.default.purple500
                            : Colors.default.optionText
                    }
                    onPressHandler={() => handleButtonPress('option4', option4)}
                    capitalise={false}
                    isOption={true}
                />

                <View style={{marginTop: 50, marginBottom: 50}}>
                    <CustomButton
                        label="check"
                        labelColor="#18113C"
                        backgroundColor={
                            selectedButton
                                ? Colors.default.green
                                : Colors.light.background
                        }
                        borderColor={
                            selectedButton
                                ? Colors.default.green
                                : Colors.default.optionText
                        }
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
                                justifyContent: 'space-between',
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
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
                                        color: isCorrect
                                            ? '#1ACB98'
                                            : Colors.default.red,
                                    }}
                                >
                                    {isCorrect ? 'Correct' : 'Incorrect'}
                                </Text>
                            </View>
                            {isCorrect && (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            color: '#1ACB98',
                                            marginRight: 8,
                                        }}
                                    >
                                        +{currentPoints} XP
                                    </Text>
                                    <Image
                                        source={require('@/assets/images/grey_xp.png')}
                                        style={{width: 24, height: 24}}
                                    />
                                </View>
                            )}
                        </View>
                        <Text style={{marginBottom: 10, fontWeight: 'bold'}}>
                            {selectedButton ? selectedButton!.explanation : ''}
                        </Text>
                        <View style={{alignItems: 'center'}}>
                            <CustomButton
                                label={isCorrect ? 'continue' : 'try again'}
                                labelColor={
                                    isCorrect
                                        ? '#18113C'
                                        : Colors.light.background
                                }
                                backgroundColor={
                                    isCorrect
                                        ? Colors.default.green
                                        : Colors.default.red
                                }
                                borderColor={
                                    isCorrect
                                        ? Colors.default.green
                                        : Colors.default.red
                                }
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
        // backgroundColor: '#D9D9D9',
        backgroundColor: '#ECEBEB',
        paddingTop: 20,
        paddingBottom: 20,
    },
    modalContent: {
        width: '100%',
        padding: 20,
    },
});
