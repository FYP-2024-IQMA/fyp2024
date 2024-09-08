export const getLessonDetails = async (
    sectionID: string,
    unitID: string,
    lessonID: string
) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/lesson/getlesson/${sectionID}/${unitID}/${lessonID}`;
        const response = await fetch(url);
        const lessonDetails = await response.json();
        // console.log(lessonDetails);
        return lessonDetails;
    } catch (error) {
        console.error('Error fetching lessonDetails:', error);
        return;
    }
};
