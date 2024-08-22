"use strict";
// export interface Result {
//     userID: string;
//     quizID: number;
//     score: number;
//     dateCreated: Date;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
//     getUserID(): string;
//     getQuizID(): string;
//     getScore(): string;
//     getDateCreated(): Date;
// }
class Result {
    constructor(userID, quizID, score, dateCreated) {
        this.userID = userID;
        this.quizID = quizID;
        this.score = score;
        this.dateCreated = dateCreated;
    }
    getUserID() {
        return this.userID;
    }
    getQuizID() {
        return this.quizID;
    }
    getScore() {
        return this.score;
    }
    getDateCreated() {
        return this.dateCreated;
    }
}
exports.Result = Result;
