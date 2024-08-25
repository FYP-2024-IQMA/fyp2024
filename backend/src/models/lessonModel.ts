export class Lesson {
    sectionID: string;
    unitID: string;
    lessonID: string;
    lessonName: string;
    lessonURL: string;
    lessonDuration: number;
    lessonText: string;
    lessonDescription: string;
    lessonKeyTakeaway: string;
    lessonCheatSheet: string;
    dateCreated: Date;

    constructor(
        sectionID: string,
        unitID: string,
        lessonID: string,
        lessonName: string,
        lessonURL: string,
        lessonDuration: number,
        lessonText: string,
        lessonDescription: string,
        lessonKeyTakeaway: string,
        lessonCheatSheet: string,
        dateCreated: Date
    ) {
        this.sectionID = sectionID;
        this.unitID = unitID;
        this.lessonID = lessonID;
        this.lessonName = lessonName;
        this.lessonURL = lessonURL;
        this.lessonDuration = lessonDuration;
        this.lessonText = lessonText;
        this.lessonDescription = lessonDescription;
        this.lessonKeyTakeaway = lessonKeyTakeaway;
        this.lessonCheatSheet = lessonCheatSheet;
        this.dateCreated = dateCreated;
    }
}
