import supabase from "./config/supabaseConfig";

export async function getAllAccounts() {
    const { data, error } = await supabase
        .from("accounts")
        .select("*")

    if (error) {
        console.error(error);
        return;
    } else {
        console.log(data);
    }
}

getAllAccounts();