import supabase from "../config/supabaseConfig";
import {
    Accounts,
    Admin,
    Age,
    Gender,
    Learner,
    Role,
} from "../models/accountsModel";

/* CREATE */

export async function createAccount(account: Accounts) {
    const { userId, firstName, lastName, email, role, age, gender } = account;

    const { data, error } = await supabase
        .from("accounts")
        .insert({
            userid: userId,
            firstname: firstName,
            lastname: lastName,
            email: email,
            role: role,
            age: age,
            gender: gender,
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

export async function getAccountById(userid: string): Promise<Learner> {
    const { data, error } = await supabase
        .from("accounts")
        .select("*")
        .eq("userid", userid)
        .single();

    if (error) {
        console.error(error);
        throw error;
    } else {
        if (data.role === "admin") {
            return new Admin(
                data.userid,
                data.firstname,
                data.lastname,
                data.email,
                data.role as Role,
                new Date(data.datecreated!),
                data.age as Age,
                data.gender as Gender
            );
        }
        return new Learner(
            data.userid,
            data.firstname,
            data.lastname,
            data.email,
            data.role as Role,
            new Date(data.datecreated!),
            data.age as Age,
            data.gender as Gender
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
    const { userId, firstName, lastName, email } = account;

    const updateFields: { [key: string]: any } = {};

    if (firstName) updateFields.firstname = firstName;
    if (lastName) updateFields.lastname = lastName;
    if (email) updateFields.email = email;

    if (Object.keys(updateFields).length === 0) {
        throw new Error("No fields to update");
    }

    const { status, statusText, error } = await supabase
        .from("accounts")
        .update(updateFields)
        .eq("userid", userId);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return { status, statusText };
    }
}

/* DELETE */

export async function deleteAccount(userid: string) {
    const { status, statusText, error } = await supabase
        .from("accounts")
        .delete()
        .eq("userid", userid);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return { status, statusText };
    }
}
