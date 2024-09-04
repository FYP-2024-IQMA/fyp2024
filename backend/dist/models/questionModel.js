"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
class Question {
    constructor(quizID, questionNo, option1, option2, option3, option4, answer, isSelfReflection) {
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
exports.Question = Question;
