export class Unit {
    sectionID: string;
    unitID: string;
    unitName: string;
    unitDescription: string;
    assessmentIntro: string;
    realityCheck: string;
    scenario: string;
    dateCreated: Date;

    constructor(
        sectionID: string,
        unitID: string,
        unitName: string,
        unitDescription: string,
        assessmentIntro: string,
        realityCheck: string,
        scenario: string,
        dateCreated: Date
    ) {
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
