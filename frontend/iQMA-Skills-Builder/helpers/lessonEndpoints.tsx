export const getLessonDetails = async (
    sectionID: string,
    unitID: string,
    lessonID: string
) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/lesson/getlesson/${sectionID}/${unitID}/${lessonID}`;
        const response = await fetch(url);
        const lessonDetails = await response.json();
        // console.log(lessonDetails);
        return lessonDetails;
    } catch (error: any) {
        console.error('Error fetching lessonDetails:', error.response.data);
        return;
    }
};

export const getAllLesson = async (sectionID: string, unitID: string) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/lesson/getalllessons/${sectionID}/${unitID}`;
        const response = await fetch(url);
        const lessonDetails = await response.json();
        // console.log(lessonDetails);
        return lessonDetails;
    } catch (error: any) {
        console.error('Error fetching lessonDetails:', error.response.data);
        return;
    }
};

export const getNumofLessonsPerUnit = async (
    sectionID: string,
    unitID: string
) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/lesson/getnumberoflessons/${sectionID}/${unitID}`;
        const response = await fetch(url);
        const lessonProgress = await response.json();
        return lessonProgress;
    } catch (error: any) {
        console.error(
            'Error while loading lesson progress:',
            error.response.data
        );
        return 0;
    }
};
