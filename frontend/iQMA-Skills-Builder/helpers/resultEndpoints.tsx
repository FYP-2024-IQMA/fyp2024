export const numberOfCompletedUnitsPerSection = async (
    userID: string,
    sectionID: string
): Promise<number> => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/result/getuserprogress/${userID}/${sectionID}`;
        const response = await fetch(url);
        const unitProgress = await response.json();
        return unitProgress;
    } catch (error) {
        console.error('Error while loading completed unit:', error);
        return 0;
    }
};

export const numberOfCompletedLessonsPerUnit = async (
    userID: string,
    sectionID: string,
    unitID: string
): Promise<number> => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/result/getnoofcompletedlessons/${userID}/${sectionID}/${unitID}`;
        const response = await fetch(url);
        const lessonProgress = await response.json();
        return lessonProgress;
    } catch (error) {
        console.error('Error while loading completed lesson:', error);
        return 0;
    }
};
