import supabase from "../config/supabaseConfig";
import {
    Accounts,
    Admin,
    Learner
} from "../models/accountsModel";

/* CREATE */

export async function createAccount(account: Accounts) {
    const { userID, firstName, lastName, email, role, age, gender, has_onboarded } = account;

    const { data, error } = await supabase
        .from("accounts")
        .insert({
            userID,
            firstName,
            lastName,
            email,
            role,
            age,
            gender,
            has_onboarded
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

export async function getAllAccounts() {
    const { data, error } = await supabase.from("accounts").select("*");

    if (error) {
        console.error(error);
        throw error;
    } else {
        return data;
    }
}

export async function getAccountById(userID: string): Promise<Learner> {
    const { data, error } = await supabase
        .from("accounts")
        .select("*")
        .eq("userID", userID)
        .single();

    if (error) {
        console.error(error);
        throw error;
    } else {
        if (data.role === "admin") {
            return new Admin(
                data.userID,
                data.firstName,
                data.lastName,
                data.email,
                data.role,
                new Date(data.dateCreated!),
                data.age,
                data.gender,
                data.has_onboarded ?? false
            );
        }
        return new Learner(
            data.userID,
            data.firstName,
            data.lastName,
            data.email,
            data.role,
            new Date(data.dateCreated!),
            data.age,
            data.gender,
            data.has_onboarded ?? false
        );
    }
}

export async function getAccountsByRole(role: string) {
    const { data, error } = await supabase
        .from("accounts")
        .select("*")
        .eq("role", role);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return data;
    }
}

/* UPDATE */

export async function updateAccount(account: Accounts) {
    const { userID, firstName, lastName, email, has_onboarded } = account;

    const updateFields: { [key: string]: any } = {};

    if (firstName) updateFields.firstName = firstName;
    if (lastName) updateFields.lastName = lastName;
    if (email) updateFields.email = email;
    if (has_onboarded) updateFields.has_onboarded = has_onboarded;

    if (Object.keys(updateFields).length === 0) {
        throw new Error("No fields to update");
    }

    const { status, statusText, error } = await supabase
        .from("accounts")
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

export async function deleteAccount(userID: string) {
    const { status, statusText, error } = await supabase
        .from("accounts")
        .delete()
        .eq("userID", userID);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return { status, statusText };
    }
}
