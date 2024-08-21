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

export async function getAllQuizzes() {
    const { data, error } = await supabase
    .from("quiz")
    .select("*");

    if (error) {
        console.error(error);
        throw error;
    } else {
        return data;
    }
}


export async function getQuizByUserId(userID: string) {
    const { data, error } = await supabase
        .from("quiz")
        .select("*")
        .eq("userID", userID)
        .single();

    if (error) {
        console.error(error);
        throw error;
    } else {
        if (data.unitID == null) {
            console.error("Unit ID is null");
            return null;
        }
        else if (data.lessonID == null) {
            console.error("Lesson ID is null");
            return null;
        }
        return new Quiz(
            data.quizID,
            data.sectionID,
            data.unitID,
            data.lessonID,
            data.quizType,
            data.lastUpdated ? new Date(data.lastUpdated) : new Date(),
        );
    }
}

export async function getNumberOfCompletedQuizzes(userID: string) {
    const { data, error } = await supabase
        .from("quiz")
        .select("quizID")
        .eq("userID", userID);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return data.length;
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

// export async function deleteQuiz(userID: string) {
//     const { status, statusText, error } = await supabase
//         .from("quiz")
//         .delete()
//         .eq("userID", userID);

//     if (error) {
//         console.error(error);
//         throw error;
//     } else {
//         return { status, statusText };
//     }
// }
