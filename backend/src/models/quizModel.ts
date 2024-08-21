import { Enums } from "../config/database.types";

export class Quiz {
    quizID: number;
    sectionID: string;
    unitID: string;
    lessonID: string;
    quizType: Enums<"quiz_type">;
    lastUpdated: Date;

    constructor(
        quizID: number,
        sectionID: string,
        unitID: string,
        lessonID: string,
        quizType: Enums<"quiz_type">,
        lastUpdated: Date
    ) {
        this.quizID = quizID;
        this.sectionID = sectionID;
        this.unitID = unitID;
        this.lessonID = lessonID;
        this.quizType = quizType;
        this.lastUpdated = lastUpdated;
    }

    getsectionID(): string {
        return this.sectionID;
    }
    getunitID(): string {
        return this.unitID;
    }
    getlessonID(): string {
        return this.lessonID;
    }
    getquizType(): Enums<"quiz_type"> {
        return this.quizType;
    }
    // getCompletedLessons(): number;
    // getDateCreated(): Date;


}
