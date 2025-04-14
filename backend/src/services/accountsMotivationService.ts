import supabase from "../config/supabaseConfig";
import { AccountsMotivation } from "../models/accountsMotivationModel";

/* CREATE */

export async function createAccountMotivation(accountMotivation: AccountsMotivation) {
    const { userID, motivations, learningMotivation } = accountMotivation;

    const { data, error } = await supabase
        .from("accounts_motivation")
        .insert({
            userID,
            motivations,
            learningMotivation
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

export async function getAccountMotivationById(userID: string): Promise<AccountsMotivation> {
    const { data, error } = await supabase
        .from("accounts_motivation")
        .select("*")
        .eq("userID", userID)
        .single();

    if (error) {
        console.error(error);
        throw error;
    } else {
        return new AccountsMotivation(
            data.userID,
            data.motivations,
            data.learningMotivation,
        );
    }
}

/* UPDATE */

export async function updateAccountMotivation(accountMotivation: AccountsMotivation) {
    const { userID, motivations, learningMotivation } = accountMotivation;

    const updateFields: { [key: string]: any } = {};

    if (motivations) updateFields.motivations = motivations;
    if (learningMotivation) updateFields.learningMotivation = learningMotivation;

    if (Object.keys(updateFields).length === 0) {
        throw new Error("No fields to update");
    }

    const { status, statusText, error } = await supabase
        .from("accounts_motivation")
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

export async function deleteAccountMotivation(userID: string) {
    const { status, statusText, error } = await supabase
        .from("accounts_motivation")
        .delete()
        .eq("userID", userID);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return { status, statusText };
    }
}