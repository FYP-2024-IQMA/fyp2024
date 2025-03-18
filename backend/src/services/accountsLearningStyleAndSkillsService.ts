import supabase from "../config/supabaseConfig";
import { AccountsLearningStyleAndSkills } from "../models/accountsLearningStyleAndSkillsModel";
import { Enums } from "../config/database.types";

/* CREATE */

export async function createAccountLearningStyleAndSkills(accountLearningStyleAndSkills: AccountsLearningStyleAndSkills) {
    const { userID, educationLevel, preferredLearningStyles, currentSkillLevelInLeadership } = accountLearningStyleAndSkills;

    const { data, error } = await supabase
        .from("accounts_learning_style_and_skills")
        .insert({
            userID,
            educationLevel,
            preferredLearningStyles,
            currentSkillLevelInLeadership
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

export async function getAccountLearningStyleAndSkillsById(userID: string): Promise<AccountsLearningStyleAndSkills> {
    const { data, error } = await supabase
        .from("accounts_learning_style_and_skills")
        .select("*")
        .eq("userID", userID)
        .single();

    if (error) {
        console.error(error);
        throw error;
    } else {
        return new AccountsLearningStyleAndSkills(
            data.userID,
            data.educationLevel,
            data.preferredLearningStyles,
            data.currentSkillLevelInLeadership,
        );
    }
}

/* UPDATE */

export async function updateAccountLearningStyleAndSkills(accountLearningStyleAndSkills: AccountsLearningStyleAndSkills) {
    const { userID, educationLevel, preferredLearningStyles, currentSkillLevelInLeadership } = accountLearningStyleAndSkills;

    const updateFields: { [key: string]: any } = {};

    if (educationLevel) updateFields.educationLevel = educationLevel;
    if (preferredLearningStyles) updateFields.preferredLearningStyles = preferredLearningStyles;
    if (currentSkillLevelInLeadership) updateFields.currentSkillLevelInLeadership = currentSkillLevelInLeadership;

    if (Object.keys(updateFields).length === 0) {
        throw new Error("No fields to update");
    }

    const { status, statusText, error } = await supabase
        .from("accounts_learning_style_and_skills")
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

export async function deleteAccountLearningStyleAndSkills(userID: string) {
    const { status, statusText, error } = await supabase
        .from("accounts_learning_style_and_skills")
        .delete()
        .eq("userID", userID);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return { status, statusText };
    }
}