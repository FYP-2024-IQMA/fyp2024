import {
    Quiz,
} from "../models/quizModel";
import supabase from "../config/supabaseConfig";

/* CREATE */

export async function createQuiz(Quiz: Quiz) {
    const { quizID, sectionID, unitID, lessonID, quizType, lastUpdated } = Quiz;

    const { data, error } = await supabase
        .from("quiz")
        .insert({
            quizType, 
            sectionID, 
            lessonID,
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

// get number of quizzes per unit
export async function getNumberOfQuizzesPerUnit(unitID: string) {
    const { count, error } = await supabase
        .from("quiz")
        .select("quizID", { count: "exact" })
        .eq("unitID", unitID);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return count;
    }
}


// get number of completed quizzes by user: for circular progress on homepage
export async function getNumberOfCompletedQuizzes(unitID: string, userID: string) {
    
    try{
    const { data, error } = await supabase
        .from("quiz")
        .select("quizID")
        .eq("unitID", unitID);

    if (error) {
        console.error(error);
        throw error;
    }

    // if no quizzes found under the unit, return 0
    if(!data || data.length === 0) {
        return 0;
    }

    const quizIDs = data.map((quiz) => quiz.quizID);

    //get number completed by users
    const {count, error: resultError} = await supabase
    .from("result")
    .select("quizID", {count: "exact"})
    .in("quizID", quizIDs)
    .eq("userID", userID);

    if (resultError){
        console.error(resultError);
        throw resultError;
    }

    return count;

} catch (error) {
    console.error("Error in getNumberofCompletedQuizzes",error);
    throw error;

}
}


/* UPDATE */

export async function updateQuiz(Quiz: Quiz) {
    const { quizID, sectionID, unitID, lessonID, quizType, lastUpdated } = Quiz;

    const updateFields: { [key: string]: any } = {};

    if (quizID) updateFields.quizID = quizID;
    if (sectionID) updateFields.sectionID = sectionID;
    if (unitID) updateFields.unitID = unitID;
    if (lessonID) updateFields.lessonID = lessonID;
    if (quizType) updateFields.quizType = quizType;
    if (lastUpdated) updateFields.lastUpdated = lastUpdated;

    if (Object.keys(updateFields).length === 0) {
        throw new Error("No fields to update");
    }

    const { status, statusText, error } = await supabase
        .from("quiz")
        .update(updateFields)
        .eq("quizID", quizID);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return { status, statusText };
    }
}

/* DELETE */

// export async function deleteQuiz(sectionID: string) {
//     const { status, statusText, error } = await supabase
//         .from("quiz")
//         .delete()
//         .eq("sectionID", sectionID);

//     if (error) {
//         console.error(error);
//         throw error;
//     } else {
//         return { status, statusText };
//     }
// }

