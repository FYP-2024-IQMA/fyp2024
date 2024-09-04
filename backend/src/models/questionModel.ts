
export interface Option {
    option: string;
    explanation: string;
}

export class Question {
    quizID: number;
    questionNo: number;
    option1: Option | null;
    option2: Option | null;
    option3: Option | null;
    option4: Option | null;
    answer: string;
    isSelfReflection: boolean;

    constructor(
        quizID: number,
        questionNo: number,
        option1: Option | null,
        option2: Option | null,
        option3: Option | null,
        option4: Option | null,
        answer: string,
        isSelfReflection: boolean
    ) {
        this.quizID = quizID;
        this.questionNo = questionNo;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.answer = answer;
        this.isSelfReflection = isSelfReflection;
    }
}
