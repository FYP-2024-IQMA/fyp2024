export interface Option {
    option: string;
    explanation: string;
}

export interface Question {
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
