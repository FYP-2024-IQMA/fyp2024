import supabase from "../config/supabaseConfig";

/* READ */

export async function getNoOfUnitPerSection(sectionID: string) {
    const { count, error } = await supabase
        .from("unit")
        .select("*", { count: "exact" })
        .eq("sectionID", sectionID);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return count;
    }
}
