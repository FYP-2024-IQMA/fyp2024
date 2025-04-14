import supabase from "../config/supabaseConfig";
import { AccountsSocialAndTechHabits } from "../models/accountsSocialAndTechHabitsModel";

/* CREATE */

export async function createAccountSocialAndTechHabits(accountSocialAndTechHabits: AccountsSocialAndTechHabits) {
    const { userID, workStyle, computerSkills } = accountSocialAndTechHabits;

    const { data, error } = await supabase
        .from("accounts_social_and_tech_habits")
        .insert({
            userID,
            workStyle,
            computerSkills
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

export async function getAccountSocialAndTechHabitsById(userID: string): Promise<AccountsSocialAndTechHabits> {
    const { data, error } = await supabase
        .from("accounts_social_and_tech_habits")
        .select("*")
        .eq("userID", userID)
        .single();

    if (error) {
        console.error(error);
        throw error;
    } else {
        return new AccountsSocialAndTechHabits(
            data.userID,
            data.workStyle,
            data.computerSkills,
        );
    }
}

/* UPDATE */

export async function updateAccountSocialAndTechHabits(accountSocialAndTechHabits: AccountsSocialAndTechHabits) {
    const { userID, workStyle, computerSkills } = accountSocialAndTechHabits;

    const updateFields: { [key: string]: any } = {};

    if (workStyle) updateFields.workStyle = workStyle;
    if (computerSkills) updateFields.computerSkills = computerSkills;

    if (Object.keys(updateFields).length === 0) {
        throw new Error("No fields to update");
    }

    const { status, statusText, error } = await supabase
        .from("accounts_social_and_tech_habits")
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

export async function deleteAccountSocialAndTechHabits(userID: string) {
    const { status, statusText, error } = await supabase
        .from("accounts_social_and_tech_habits")
        .delete()
        .eq("userID", userID);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return { status, statusText };
    }
}