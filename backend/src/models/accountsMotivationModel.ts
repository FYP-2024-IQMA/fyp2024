import { Enums } from "../config/database.types";

export class AccountsMotivation {
    userID: string;
    motivations: Enums<"motivation_type">[];
    learningMotivation: Enums<"learning_motivation_type">;

    constructor(
        userID: string,
        motivations: Enums<"motivation_type">[],
        learningMotivation: Enums<"learning_motivation_type">,
    ) {
        this.userID = userID;
        this.motivations = motivations;
        this.learningMotivation = learningMotivation;
    }

    getMotivations(): Enums<"motivation_type">[] {
        return this.motivations;
    }
    getLearningMotivation(): Enums<"learning_motivation_type"> {
        return this.learningMotivation;
    }
}
