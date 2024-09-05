"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lesson = void 0;
class Lesson {
    constructor(sectionID, unitID, lessonID, lessonName, lessonURL, lessonDuration, lessonText, lessonDescription, lessonKeyTakeaway, lessonCheatSheet, dateCreated) {
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
exports.Lesson = Lesson;
