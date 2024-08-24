import supabase from "../config/supabaseConfig";

/* READ */

export async function getNoOfLessonPerUnit(sectionID: string, unitID: string) {
    const { count, error } = await supabase
        .from("lesson")
        .select("*", { count: "exact" })
        .eq("sectionID", sectionID)
        .eq("unitID", unitID);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return count;
    }
}