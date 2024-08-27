"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unit = void 0;
class Unit {
    constructor(sectionID, unitID, unitName, unitDescription, assessmentIntro, realityCheck, scenario, dateCreated) {
        this.sectionID = sectionID;
        this.unitID = unitID;
        this.unitName = unitName;
        this.unitDescription = unitDescription;
        this.assessmentIntro = assessmentIntro;
        this.realityCheck = realityCheck;
        this.scenario = scenario;
        this.dateCreated = dateCreated;
    }
}
exports.Unit = Unit;
