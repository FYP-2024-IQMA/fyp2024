import supabase from "../config/supabaseConfig";

type SectionUnit = {
    sectionID: string;
    unitID: string;
}

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

// get All Units by Section ID
export async function getAllUnitsBySection(sectionID: string){
    const { data, error } = await supabase
        .from("unit")
        .select("*")
        .eq("sectionID", sectionID);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return data;
    }
}

// get Unit Details By Section and Unit
export async function getUnitDetailsBySectionAndUnit(sectionUnit: SectionUnit){

    const { sectionID, unitID } = sectionUnit;

    const { data, error } = await supabase
        .from("unit")
        .select("*")
        .eq("sectionID", sectionID)
        .eq("unitID", unitID)
        .single();

    if (error) {
        console.error(error);
        throw error;
    } else {
        return data;
    }
}