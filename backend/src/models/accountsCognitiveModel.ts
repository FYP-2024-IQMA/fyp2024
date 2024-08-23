import { Enums } from "../config/database.types";

export class AccountsCognitive {
    userID: string;
    educationalLevel: Enums<"educational_level_type">;
    languageAbilities: Enums<"language_abilities_type">;
    learningPreferences: Enums<"learning_preferences_type">;
    litNumProficiency: Enums<"literacy_numeracy_proficiency_type">;
    priorKnowledge: Enums<"prior_knowledge_skills_type">;

    constructor(
        userID: string,
        educationalLevel: Enums<"educational_level_type">,
        languageAbilities: Enums<"language_abilities_type">,
        learningPreferences: Enums<"learning_preferences_type">,
        litNumProficiency: Enums<"literacy_numeracy_proficiency_type">,
        priorKnowledge: Enums<"prior_knowledge_skills_type">
    ) {
        this.userID = userID;
        this.educationalLevel = educationalLevel;
        this.languageAbilities = languageAbilities;
        this.learningPreferences = learningPreferences;
        this.litNumProficiency = litNumProficiency;
        this.priorKnowledge = priorKnowledge;
    }

    getEducationalLevel(): Enums<"educational_level_type"> {
        return this.educationalLevel;
    }
    getLanguageAbilities(): Enums<"language_abilities_type"> {
        return this.languageAbilities;
    }
    getLearningPreferences(): Enums<"learning_preferences_type"> {
        return this.learningPreferences;
    }
    getLitNumProficiency(): Enums<"literacy_numeracy_proficiency_type"> {
        return this.litNumProficiency;
    }
    getPriorKnowledge(): Enums<"prior_knowledge_skills_type"> {
        return this.priorKnowledge;
    }
}
