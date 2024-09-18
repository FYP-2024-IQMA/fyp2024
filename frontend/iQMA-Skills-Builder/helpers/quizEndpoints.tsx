export const getQuizzes = async (
    sectionID: string,
    unitID: string,
    lessonID: string
) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/quiz/getquestions/${sectionID}/${unitID}/${lessonID}`;
        const response = await fetch(url);
        const quizzes = await response.json();

        return quizzes;
    } catch (error) {
        console.error('Error fetching Quizzes:', error);
        return;
    }
};

export const getAssessmentQuestions = async (
    sectionID: string,
    unitID: string
) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/quiz/getquestions/${sectionID}/${unitID}`;
        const response = await fetch(url);
        const assessmentQuestions = await response.json();

        const filteredQuestions = assessmentQuestions.filter(
            (question: any) => !question.isSelfReflection
        ); // only return questions that are not Self Reflection

        return filteredQuestions;
    } catch (error) {
        console.error('Error fetching Assessment Questions:', error);
        return;
    }
};

export const getFinalAssessmentQuestions = async (
    sectionID: string,
) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/quiz/getquestions/${sectionID}`;
        const response = await fetch(url);
        const assessmentQuestions = await response.json();

        return assessmentQuestions;
    } catch (error) {
        console.error('Error fetching Final Assessment Questions:', error);
        return;
    }
};
