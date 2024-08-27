import { Quiz } from "../models/quizModel";
import supabase from "../config/supabaseConfig";

/* READ */

// get all quizzes
export async function getAllQuizzes() {
    const { data, error } = await supabase.from("quiz").select("*");

    if (error) {
        console.error(error);
        throw error;
    } else {
        return data;
    }
}

// get all quizzes by sectionID
export async function getQuizzesBySectionId(sectionID: string) {
    const { data, error } = await supabase
        .from("quiz")
        .select("*")
        .eq("sectionID", sectionID)

    if (error) {
        console.error(error);
        throw error;
    } else {
        return data;
    }
}

