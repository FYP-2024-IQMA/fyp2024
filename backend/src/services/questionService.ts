import supabase from "../config/supabaseConfig";


/* READ */

export async function getQuizQuestions(sectionID: string, unitID?: string, lessonID?: string) {

    let query = supabase
        .from("question")
        .select("quizID, quiz!inner(quizID), *")
        .order("questionNo")
        .eq("quiz.sectionID", sectionID);


    if (lessonID) {
        // get lesson quiz questions
        query = query
            .eq("quiz.unitID", unitID!)
            .eq("quiz.lessonID", lessonID)
            .eq("quiz.quizType", "lesson");
    } else {
        // get unit quiz questions
        if (unitID) {
            query = query
                .eq("quiz.unitID", unitID)
                .eq("quiz.quizType", "unit");
        } else {
            // get section quiz questions
            query = query
                .eq("quiz.quizType", "section");
        }
    }

    const { data, error } = await query;

    if (error) {
        console.error(error);
        throw error;
    }
    
    const cleanedData = data.map(({ quiz, ...rest }) => rest);

    return cleanedData;
}



