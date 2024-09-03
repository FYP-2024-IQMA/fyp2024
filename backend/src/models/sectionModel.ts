export class Section {
	sectionID: string;
	sectionName: string;
	sectionDescription: string;
	introductionURL: string;
	finalAssessment: string;
	finalScenario: string;
	dateCreated: Date;

	constructor(
		sectionID: string,
		sectionName: string,
		sectionDescription: string,
		introductionURL: string,
		finalAssessment: string,
		finalScenario: string,
		dateCreated: Date
	) {
		this.sectionID = sectionID;
		this.sectionName = sectionName;
		this.sectionName = sectionName;
		this.sectionDescription = sectionDescription;
		this.introductionURL = introductionURL;
		this.finalAssessment = finalAssessment;
		this.finalScenario = finalScenario;
		this.dateCreated = dateCreated;
	}
}
