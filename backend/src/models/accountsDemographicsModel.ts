import { Enums } from "../config/database.types";

export class AccountsDemographics {
    userID: string;
    careerStage: Enums<"career_stage_type">;
    ethnicGroup: string;
    jobCategory: Enums<"job_category_type">;
    lifeStage: Enums<"life_stage_type">;
    race: Enums<"race_type">;
    specialNeeds: Enums<"special_needs_type">;

    constructor(
        userID: string,
        careerStage: Enums<"career_stage_type">,
        ethnicGroup: string,
        jobCategory: Enums<"job_category_type">,
        lifeStage: Enums<"life_stage_type">,
        race: Enums<"race_type">,
        specialNeeds: Enums<"special_needs_type">
    ) {
        this.userID = userID;
        this.careerStage = careerStage;
        this.ethnicGroup = ethnicGroup;
        this.jobCategory = jobCategory;
        this.lifeStage = lifeStage;
        this.race = race;
        this.specialNeeds = specialNeeds;
    }

    getCareerStage(): Enums<"career_stage_type"> {
        return this.careerStage;
    }
    getEthnicGroup(): string {
        return this.ethnicGroup;
    }
    getJobCategory(): Enums<"job_category_type"> {
        return this.jobCategory;
    }
    getLifeStage(): Enums<"life_stage_type"> {
        return this.lifeStage;
    }
    getRace(): Enums<"race_type"> {
        return this.race;
    }
    getSpecialNeeds(): Enums<"special_needs_type"> {
        return this.specialNeeds;
    }
}
