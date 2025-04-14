import { Enums } from "../config/database.types";

export class AccountsSocialAndTechHabits {
    userID: string;
    workStyle: Enums<"work_style_type">;
    computerSkills: Enums<"computer_skills_type">;

    constructor(
        userID: string,
        workStyle: Enums<"work_style_type">,
        computerSkills: Enums<"computer_skills_type">,
    ) {
        this.userID = userID;
        this.workStyle = workStyle;
        this.computerSkills = computerSkills;
    }

    getWorkStyle(): Enums<"work_style_type"> {
        return this.workStyle;
    }
    getComputerSkills(): Enums<"computer_skills_type"> {
        return this.computerSkills;
    }
}
