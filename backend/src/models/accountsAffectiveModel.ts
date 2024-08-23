import { Enums } from "../config/database.types";

export class AccountsAffective {
    userID: string;
    attitude: Enums<"attitude_towards_learning_type">;
    barriers: Enums<"barriers_to_learning_interests_type">[];
    motivationalLevel: Enums<"motivational_level_type">;
    personality: Enums<"personality_type">;
    reasons: Enums<"reasons_for_attending_section_type">[];

    constructor(
        userID: string,
        attitude: Enums<"attitude_towards_learning_type">,
        barriers: Enums<"barriers_to_learning_interests_type">[],
        motivationalLevel: Enums<"motivational_level_type">,
        personality: Enums<"personality_type">,
        reasons: Enums<"reasons_for_attending_section_type">[]
    ) {
        this.userID = userID;
        this.attitude = attitude;
        this.barriers = barriers;
        this.motivationalLevel = motivationalLevel;
        this.personality = personality;
        this.reasons = reasons;
    }

    getAttitude(): Enums<"attitude_towards_learning_type"> {
        return this.attitude;
    }
    getBarriers(): Enums<"barriers_to_learning_interests_type">[] {
        return this.barriers;
    }
    getMotivationalLevel(): Enums<"motivational_level_type"> {
        return this.motivationalLevel;
    }
    getPersonality(): Enums<"personality_type"> {
        return this.personality;
    }
    getReasons(): Enums<"reasons_for_attending_section_type">[] {
        return this.reasons;
    }
}
