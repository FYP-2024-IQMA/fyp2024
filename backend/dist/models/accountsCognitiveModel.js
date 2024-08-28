"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsCognitive = void 0;
class AccountsCognitive {
    constructor(userID, educationalLevel, languageAbilities, learningPreferences, litNumProficiency, priorKnowledge) {
        this.userID = userID;
        this.educationalLevel = educationalLevel;
        this.languageAbilities = languageAbilities;
        this.learningPreferences = learningPreferences;
        this.litNumProficiency = litNumProficiency;
        this.priorKnowledge = priorKnowledge;
    }
    getEducationalLevel() {
        return this.educationalLevel;
    }
    getLanguageAbilities() {
        return this.languageAbilities;
    }
    getLearningPreferences() {
        return this.learningPreferences;
    }
    getLitNumProficiency() {
        return this.litNumProficiency;
    }
    getPriorKnowledge() {
        return this.priorKnowledge;
    }
}
exports.AccountsCognitive = AccountsCognitive;
