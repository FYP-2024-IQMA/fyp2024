import supabase from "../config/supabaseConfig";
import {
    AccountsDemographics
} from "../models/accountsDemographicsModel";

/* CREATE */

export async function createAccountDemographics(accountDemographics: AccountsDemographics) {
    const { userID, careerStage, ethnicGroup, jobCategory, lifeStage, race, specialNeeds } = accountDemographics;

    const { data, error } = await supabase
        .from("accountsdemographics")
        .insert({
            userID,
            careerStage,
            ethnicGroup,
            jobCategory,
            lifeStage,
            race,
            specialNeeds
        })
        .select();

    if (error) {
        console.error(error);
        throw error;
    } else {
        return data;
    }
}

/* READ */

export async function getAccountDemographicsById(userID: string): Promise<AccountsDemographics> {
    const { data, error } = await supabase
        .from("accountsdemographics")
        .select("*")
        .eq("userID", userID)
        .single();

    if (error) {
        console.error(error);
        throw error;
    } else {
        return new AccountsDemographics(
            data.userID,
            data.careerStage,
            data.ethnicGroup,
            data.jobCategory,
            data.lifeStage,
            data.race,
            data.specialNeeds
        );
    }
}

/* UPDATE */

export async function updateAccountCognitive(accountDemographics: AccountsDemographics) {
    const { userID, careerStage, ethnicGroup, jobCategory, lifeStage, race, specialNeeds } = accountDemographics;

    const updateFields: { [key: string]: any } = {};

    if (careerStage) updateFields.careerStage = careerStage;
    if (ethnicGroup) updateFields.ethnicGroup = ethnicGroup;
    if (jobCategory) updateFields.jobCategory = jobCategory;
    if (lifeStage) updateFields.lifeStage = lifeStage;
    if (race) updateFields.race = race;
    if (specialNeeds) updateFields.specialNeeds = specialNeeds;

    if (Object.keys(updateFields).length === 0) {
        throw new Error("No fields to update");
    }

    const { status, statusText, error } = await supabase
        .from("accountsdemographics")
        .update(updateFields)
        .eq("userID", userID);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return { status, statusText };
    }
}

/* DELETE */

export async function deleteAccountDemographics(userID: string) {
    const { status, statusText, error } = await supabase
        .from("accountsdemographics")
        .delete()
        .eq("userID", userID);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return { status, statusText };
    }
}