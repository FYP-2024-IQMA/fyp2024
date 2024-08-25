import supabase from "../config/supabaseConfig";
import {
    AccountsSocial
} from "../models/accountsSocialModel";

/* CREATE */

export async function createAccountSocial(accountSocial: AccountsSocial) {
    const { userID, compLiteracy, relationshipToPeers, socialBackground, tendency } = accountSocial;

    const { data, error } = await supabase
        .from("accountssocial")
        .insert({
            userID,
            compLiteracy,
            relationshipToPeers,
            socialBackground,
            tendency,
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

export async function getAccountSocialById(userID: string): Promise<AccountsSocial> {
    const { data, error } = await supabase
        .from("accountssocial")
        .select("*")
        .eq("userID", userID)
        .single();

    if (error) {
        console.error(error);
        throw error;
    } else {
        return new AccountsSocial(
            data.userID,
            data.compLiteracy,
            data.relationshipToPeers,
            data.socialBackground,
            data.tendency,
        );
    }
}

/* UPDATE */

export async function updateAccountSocial(accountSocial: AccountsSocial) {
    const { userID, compLiteracy, relationshipToPeers, socialBackground, tendency } = accountSocial;

    const updateFields: { [key: string]: any } = {};

    if (compLiteracy) updateFields.compLiteracy = compLiteracy;
    if (relationshipToPeers) updateFields.relationshipToPeers = relationshipToPeers;
    if (socialBackground) updateFields.socialBackground = socialBackground;
    if (tendency) updateFields.tendency = tendency;

    if (Object.keys(updateFields).length === 0) {
        throw new Error("No fields to update");
    }

    const { status, statusText, error } = await supabase
        .from("accountssocial")
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

export async function deleteAccountSocial(userID: string) {
    const { status, statusText, error } = await supabase
        .from("accountssocial")
        .delete()
        .eq("userID", userID);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return { status, statusText };
    }
}