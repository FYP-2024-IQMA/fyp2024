import {
    Result,
} from "../models/resultModel";
import supabase from "../config/supabaseConfig";

/* CREATE */

export async function createResult(Result: Result) {
    const { userID, quizID, score, dateCreated } = Result;

    const { data, error } = await supabase
        .from("result")
        .insert({
            quizID, 
            score, 
            userID, 
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


export async function getResultById(userID: string): Promise<Result> {
    const { data, error } = await supabase
        .from("result")
        .select("*")
        .eq("userID", userID)
        .single();

    if (error) {
        console.error(error);
        throw error;
    } else {
        return new Result(
            data.userID,
            data.quizID,
            data.score,
            data.dateCreated ? new Date(data.dateCreated) : new Date(),
        );
    }
}

export async function getNumberOfCompletedQuizzes(userID: string) {
    const { data, error } = await supabase
        .from("result")
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

export async function updateResult(Result: Result) {
    const { userID, quizID, score, dateCreated } = Result;

    const updateFields: { [key: string]: any } = {};

    if (userID) updateFields.userID = userID
    if (quizID) updateFields.quizID = quizID;
    if (dateCreated) updateFields.dateCreated = dateCreated;
    if (score) updateFields.score = score;

    if (Object.keys(updateFields).length === 0) {
        throw new Error("No fields to update");
    }

    const { status, statusText, error } = await supabase
        .from("result")
        .update(updateFields)
        .eq("userID", userID);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return { status, statusText };
    }
}

/* DELETE */

// export async function deleteResult(userID: string) {
//     const { status, statusText, error } = await supabase
//         .from("result")
//         .delete()
//         .eq("userID", userID);

//     if (error) {
//         console.error(error);
//         throw error;
//     } else {
//         return { status, statusText };
//     }
// }
