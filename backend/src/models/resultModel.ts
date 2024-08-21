
// export interface Result {
//     userID: string;
//     quizID: number;
//     score: number;
//     dateCreated: Date;

//     getUserID(): string;
//     getQuizID(): string;
//     getScore(): string;
//     getDateCreated(): Date;
// }

export class Result {
    userID: string;
    quizID: number;
    score: number;
    dateCreated: Date;

    constructor(
        userID: string,
        quizID: number,
        score: number,
        dateCreated: Date,

    ) {
        this.userID = userID;
        this.quizID = quizID;
        this.score = score;
        this.dateCreated = dateCreated;
    }

    getUserID(): string {
        return this.userID;
    }

    getQuizID(): number{
        return this.quizID;
    }

    getScore(): number{
        return this.score;
    }
   
    getDateCreated(): Date {
        return this.dateCreated;
    }
}

