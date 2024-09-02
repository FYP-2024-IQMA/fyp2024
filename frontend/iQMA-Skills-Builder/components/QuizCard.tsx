import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface Option {
    option: string;
    explanation: string;
}

interface QuestionData {
    quizID: number;
    questionNo: number;
    question: string;
    option1: Option;
    option2: Option;
    option3: Option;
    option4: Option;
    answer: string;
    isSelfReflection: boolean;
}

export const QuizCard: React.FC<{ questionData: QuestionData, onNextQuestion: () => void}> = ({ questionData, onNextQuestion }) => {
    const { question, option1, option2, option3, option4 } = questionData;

    return (
        <View>
            <Text>{question}</Text>
            <Text>{option1.option}</Text>
            <Text>{option2.option}</Text>
            <Text>{option3.option}</Text>
            <Text>{option4.option}</Text>
            <Button title="Next Question" onPress={onNextQuestion} />
        </View>
    )
}