import supabase from "../config/supabaseConfig";
import {
    AccountsCognitive
} from "../models/accountsCognitiveModel";

/* CREATE */

export async function createAccountCognitive(accountCognitive: AccountsCognitive) {
    const { userID, educationalLevel, languageAbilities, learningPreferences, litNumProficiency, priorKnowledge } = accountCognitive;

    const { data, error } = await supabase
        .from("accountscognitive")
        .insert({
            userID,
            educationalLevel,
            languageAbilities,
            learningPreferences,
            litNumProficiency,
            priorKnowledge
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

export async function getAccountCognitiveById(userID: string): Promise<AccountsCognitive> {
    const { data, error } = await supabase
        .from("accountscognitive")
        .select("*")
        .eq("userID", userID)
        .single();

    if (error) {
        console.error(error);
        throw error;
    } else {
        return new AccountsCognitive(
            data.userID,
            data.educationalLevel,
            data.languageAbilities,
            data.learningPreferences,
            data.litNumProficiency,
            data.priorKnowledge,
        );
    }
}

/* UPDATE */

export async function updateAccountCognitive(accountCognitive: AccountsCognitive) {
    const { userID, educationalLevel, languageAbilities, learningPreferences, litNumProficiency, priorKnowledge } = accountCognitive;

    const updateFields: { [key: string]: any } = {};

    if (educationalLevel) updateFields.educationalLevel = educationalLevel;
    if (languageAbilities) updateFields.languageAbilities = languageAbilities;
    if (learningPreferences) updateFields.learningPreferences = learningPreferences;
    if (litNumProficiency) updateFields.litNumProficiency = litNumProficiency;
    if (priorKnowledge) updateFields.priorKnowledge = priorKnowledge;

    if (Object.keys(updateFields).length === 0) {
        throw new Error("No fields to update");
    }

    const { status, statusText, error } = await supabase
        .from("accountscognitive")
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

export async function deleteAccountCognitive(userID: string) {
    const { status, statusText, error } = await supabase
        .from("accountscognitive")
        .delete()
        .eq("userID", userID);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return { status, statusText };
    }
}