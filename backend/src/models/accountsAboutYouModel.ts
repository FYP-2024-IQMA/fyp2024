import { Enums } from "../config/database.types";

export class AccountsAboutYou {
    userID: string;
    ageGroup: Enums<"age_type">;
    jobLevel: Enums<"job_category_type">;
    careerStage: Enums<"career_stage_type">;

    constructor(
        userID: string,
        ageGroup: Enums<"age_type">,
        jobLevel: Enums<"job_category_type">,
        careerStage: Enums<"career_stage_type">,
    ) {
        this.userID = userID;
        this.ageGroup = ageGroup;
        this.jobLevel = jobLevel;
        this.careerStage = careerStage;
    }

    getAgeGroup(): Enums<"age_type"> {
        return this.ageGroup;
    }
    getJobLevel(): Enums<"job_category_type"> {
        return this.jobLevel;
    }
    getCareerStage(): Enums<"career_stage_type"> {
        return this.careerStage;
    }
}
