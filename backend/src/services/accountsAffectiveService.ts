import supabase from "../config/supabaseConfig";
import {
    AccountsAffective
} from "../models/accountsAffectiveModel";

/* CREATE */

export async function createAccountAffective(accountAffective: AccountsAffective) {
    const { userID, attitude, barriers, motivationalLevel, personality, reasons } = accountAffective;

    const { data, error } = await supabase
        .from("accountsaffective")
        .insert({
            userID,
            attitude,
            barriers,
            motivationalLevel,
            personality,
            reasons
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

export async function getAccountAffectiveById(userID: string): Promise<AccountsAffective> {
    const { data, error } = await supabase
        .from("accountsaffective")
        .select("*")
        .eq("userID", userID)
        .single();

    if (error) {
        console.error(error);
        throw error;
    } else {
        return new AccountsAffective(
            data.userID,
            data.attitude,
            data.barriers,
            data.motivationalLevel,
            data.personality,
            data.reasons,
        );
    }
}

/* UPDATE */

export async function updateAccountAffective(accountAffective: AccountsAffective) {
    const { userID, attitude, barriers, motivationalLevel, personality, reasons } = accountAffective;

    const updateFields: { [key: string]: any } = {};

    if (attitude) updateFields.attitude = attitude;
    if (barriers) updateFields.barriers = barriers;
    if (motivationalLevel) updateFields.motivationalLevel = motivationalLevel;
    if (personality) updateFields.personality = personality;
    if (reasons) updateFields.reasons = reasons;

    if (Object.keys(updateFields).length === 0) {
        throw new Error("No fields to update");
    }

    const { status, statusText, error } = await supabase
        .from("accountsaffective")
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

export async function deleteAccountAffective(userID: string) {
    const { status, statusText, error } = await supabase
        .from("accountsaffective")
        .delete()
        .eq("userID", userID);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return { status, statusText };
    }
}