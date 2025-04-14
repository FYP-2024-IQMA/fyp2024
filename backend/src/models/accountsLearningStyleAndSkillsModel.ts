import { Enums } from "../config/database.types";

export class AccountsLearningStyleAndSkills {
    userID: string;
    educationLevel: Enums<"education_level_type">;
    preferredLearningStyles: Enums<"preferred_learning_style_type">[];
    currentSkillLevelInLeadership: Enums<"current_skill_level_in_leadership_type">;

    constructor(
        userID: string,
        educationLevel: Enums<"education_level_type">,
        preferredLearningStyles: Enums<"preferred_learning_style_type">[],
        currentSkillLevelInLeadership: Enums<"current_skill_level_in_leadership_type">,
    ) {
        this.userID = userID;
        this.educationLevel = educationLevel;
        this.preferredLearningStyles = preferredLearningStyles;
        this.currentSkillLevelInLeadership = currentSkillLevelInLeadership;
    }

    getEducationLevel(): Enums<"education_level_type"> {
        return this.educationLevel;
    }
    getPreferredLearningStyles(): Enums<"preferred_learning_style_type">[] {
        return this.preferredLearningStyles;
    }
    getCurrentSkillLevelInLeadership(): Enums<"current_skill_level_in_leadership_type"> {
        return this.currentSkillLevelInLeadership;
    }
}
