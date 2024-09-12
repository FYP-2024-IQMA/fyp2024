export const getQuizzes = async (sectionID: string, unitID: string, lessonID: string) => {
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
