import {
    Result,
} from "../models/resultModel";
import supabase from "../config/supabaseConfig";

/* CREATE */

export async function createResult(Result: Result) {
    const { userID, quizID } = Result;

    const { error } = await supabase
        .from("result")
        .insert({
            quizID,
            userID,
        });

    if (error) {
        console.error(error);
        throw error;
    } else {
        return userID;
    }
}

/* READ */

export async function getAllResults() {
    const { data, error } = await supabase
    .from("result")
    .select("*");

    if (error) {
        console.error(error);
        throw error;
    } else {
        return data;
    }
}


export async function checkIfCompletedQuiz(userID: string, quizID: string): Promise<boolean> {
    const { count, error } = await supabase
        .from("result")
        .select("*", { count: "exact" })
        .eq("userID", userID)
        .eq("quizID", quizID);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return count! > 0;
    }
}

/*
Get the User Progress: 
- no. of completed sections quiz 
- no. of completed units quiz per section
- no. of completed lessons & unit quiz per unit
*/

export async function getUserProgress(userID: string, sectionID?: string, unitID?: string): Promise<number> {
    let query = supabase
        .from("result")
        .select("quizID, quiz!inner(quizID)", { count: "exact" })
        .eq("userID", userID);
    
    // solely for circular progress
    // if unitID is provided, get number of completed lessons & unit for that unit
    if (unitID) {
        query = query
            .eq("quiz.sectionID", sectionID!)
            .eq("quiz.unitID", unitID)
            .neq("quiz.quizType", "section");
    } else {
        // for home page stone progress - whether to be lit up or not
        // if sectionID is provided, get number of completed units for that section
        if (sectionID) {
            query = query
                .eq("quiz.quizType", "unit")
                .eq("quiz.sectionID", sectionID);
        } else {
            // for header section
            // if sectionID is not provided, get number of completed sections
            query = query.eq("quiz.quizType", "section");
        }
    }

    const { count, error } = await query;

    if (error) {
        console.error(error);
        throw error;
    } else {
        return count!;
    }
}

/*
Get the User Progress: 
- no. of completed lessons per unit
*/

export async function getNoOfCompletedLesson(
    userID: string,
    sectionID: string,
    unitID: string
): Promise<number> {

    const { count, error } = await supabase
        .from("result")
        .select("quizID, quiz!inner(quizID)", { count: "exact" })
        .eq("userID", userID)
        .eq("quiz.sectionID", sectionID)
        .eq("quiz.unitID", unitID)
        .eq("quiz.quizType", "lesson");

    if (error) {
        console.error(error);
        throw error;
    } else {
        return count!;
    }
}