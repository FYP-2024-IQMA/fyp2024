import supabase from "../config/supabaseConfig";
import { AccountsAboutYou } from "../models/accountsAboutYouModel";

/* CREATE */

export async function createAccountAboutYou(accountAboutYou: AccountsAboutYou) {
    const { userID, ageGroup, jobLevel, careerStage } = accountAboutYou;

    const { data, error } = await supabase
        .from("accounts_about_you")
        .insert({
            userID,
            ageGroup,
            jobLevel,
            careerStage
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

export async function getAccountAboutYouById(userID: string): Promise<AccountsAboutYou> {
    const { data, error } = await supabase
        .from("accounts_about_you")
        .select("*")
        .eq("userID", userID)
        .single();

    if (error) {
        console.error(error);
        throw error;
    } else {
        return new AccountsAboutYou(
            data.userID,
            data.ageGroup,
            data.jobLevel,
            data.careerStage,
        );
    }
}

/* UPDATE */

export async function updateAccountAboutYou(accountAboutYou: AccountsAboutYou) {
    const { userID, ageGroup, jobLevel, careerStage } = accountAboutYou;

    const updateFields: { [key: string]: any } = {};

    if (ageGroup) updateFields.ageGroup = ageGroup;
    if (jobLevel) updateFields.jobLevel = jobLevel;
    if (careerStage) updateFields.careerStage = careerStage;

    if (Object.keys(updateFields).length === 0) {
        throw new Error("No fields to update");
    }

    const { status, statusText, error } = await supabase
        .from("accounts_about_you")
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

export async function deleteAccountAboutYou(userID: string) {
    const { status, statusText, error } = await supabase
        .from("accounts_about_you")
        .delete()
        .eq("userID", userID);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return { status, statusText };
    }
}