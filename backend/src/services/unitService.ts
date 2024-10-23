import supabase from "../config/supabaseConfig";
import * as videoService from "./videoService";

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
        // return data;
        const transformedData = data.map(unit => ({
            ...unit,
            unitDescription: unit.unitDescription ? unit.unitDescription.split('\r\n') : [],
            assessmentIntro: unit.assessmentIntro ? unit.assessmentIntro.split('\r\n') : [],
            realityCheck: unit.realityCheck ? unit.realityCheck.split('\r\n') : [],
            scenario: unit.scenario ? unit.scenario.split('\r\n') : []
        }));

        return transformedData;
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

        const realitycheckURL = await videoService.formatVideoUrl(
                null,
                sectionID,
                unitID,
            );

        return {
            ...data,
            unitDescription: data.unitDescription ? data.unitDescription.split('\r\n') : [],
            assessmentIntro: data.assessmentIntro ? data.assessmentIntro.split('\r\n') : [],
            realityCheck: data.realityCheck ? data.realityCheck.split('\r\n') : [],
            realitycheckURL,
            scenario: data.scenario ? data.scenario.split('\r\n') : []
        };
    }
}