export const numberOfCompletedUnitsPerSection = async (
    userID: string,
    sectionID: string
): Promise<number> => {
    try {
        const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/result/getuserprogress/${userID}/${sectionID}`;
        const response = await fetch(url);
        const unitProgress = await response.json();
        return unitProgress;
    } catch (error: any) {
        console.error(
            'Error while loading completed unit:',
            error.response.data
        );
        return 0;
    }
};

export const numberOfCompletedLessonsPerUnit = async (
    userID: string,
    sectionID: string,
    unitID: string
): Promise<number> => {
    try {
        const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/result/getnoofcompletedlessons/${userID}/${sectionID}/${unitID}`;
        const response = await fetch(url);
        const lessonProgress = await response.json();
        return lessonProgress;
    } catch (error: any) {
        console.error(
            'Error while loading completed lesson:',
            error.response.data
        );
        return 0;
    }
};

export const createResult = async (
    userID: string,
    quizID: number
): Promise<void> => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/result/createresult`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userID, quizID}),
        });

        const data = await response.json();
        console.log(data);
        console.log('Status: ', data.status);
        return data.status;
    } catch (error: any) {
        console.error('Error while creating result:', error.response.data);
    }
};

export const checkIfCompletedQuiz = async (
    userID: string,
    quizID: number
): Promise<boolean> => {
    try {
        const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/result/checkifcompletedquiz/${userID}/${quizID}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error(
            'Error while checking if quiz is completed:',
            error.response.data
        );
        return false;
    }
};

export const checkIfCompletedSection = async (
    userID: string,
    sectionID: string
) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/result/checkifcompletedsection/${userID}/${sectionID}`;
        const response = await fetch(url);
        const completedSection = await response.json();
        return completedSection;
    } catch (error) {
        console.error('Error while loading current section:', error);
        return false;
    }
};

export const getCurrentSection = async (userID: string): Promise<number> => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/result/getuserprogress/${userID}`;
        const response = await fetch(url);
        const completedSection = await response.json();
        return completedSection + 1;
    } catch (error) {
        console.error('Error while loading current section:', error);
        return 0;
    }
};
