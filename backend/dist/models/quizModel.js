"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
class Quiz {
    constructor(quizID, sectionID, unitID, lessonID, quizType, lastUpdated) {
        this.quizID = quizID;
        this.sectionID = sectionID;
        this.unitID = unitID;
        this.lessonID = lessonID;
        this.quizType = quizType;
        this.lastUpdated = lastUpdated;
    }
    getsectionID() {
        return this.sectionID;
    }
    getunitID() {
        return this.unitID;
    }
    getlessonID() {
        return this.lessonID;
    }
    getquizType() {
        return this.quizType;
    }
}
exports.Quiz = Quiz;
