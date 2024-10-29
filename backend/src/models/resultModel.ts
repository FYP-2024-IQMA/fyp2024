
export class Result {
    userID: string;
    quizID: number;
    dateCreated?: Date;

    constructor(
        userID: string,
        quizID: number,
        dateCreated?: Date,

    ) {
        this.userID = userID;
        this.quizID = quizID;
        this.dateCreated = dateCreated;
    }

    getUserID(): string {
        return this.userID;
    }

    getQuizID(): number{
        return this.quizID;
    }
   
    getDateCreated(): Date | null {
        return this.dateCreated!;
    }
}

