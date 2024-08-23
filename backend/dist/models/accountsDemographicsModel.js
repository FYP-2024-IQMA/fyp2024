"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsDemographics = void 0;
class AccountsDemographics {
    constructor(userID, careerStage, ethnicGroup, jobCategory, lifeStage, race, specialNeeds) {
        this.userID = userID;
        this.careerStage = careerStage;
        this.ethnicGroup = ethnicGroup;
        this.jobCategory = jobCategory;
        this.lifeStage = lifeStage;
        this.race = race;
        this.specialNeeds = specialNeeds;
    }
    getCareerStage() {
        return this.careerStage;
    }
    getEthnicGroup() {
        return this.ethnicGroup;
    }
    getJobCategory() {
        return this.jobCategory;
    }
    getLifeStage() {
        return this.lifeStage;
    }
    getRace() {
        return this.race;
    }
    getSpecialNeeds() {
        return this.specialNeeds;
    }
}
exports.AccountsDemographics = AccountsDemographics;
