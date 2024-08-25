"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
class Result {
    constructor(userID, quizID, dateCreated) {
        this.userID = userID;
        this.quizID = quizID;
        this.dateCreated = dateCreated;
    }
    getUserID() {
        return this.userID;
    }
    getQuizID() {
        return this.quizID;
    }
    getDateCreated() {
        return this.dateCreated;
    }
}
exports.Result = Result;
