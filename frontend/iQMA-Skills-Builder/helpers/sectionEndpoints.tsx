export const getSectionDetails = async (sectionID: string) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/section/sectiondetails/${sectionID}`;
        const response = await fetch(url);
        const sectionDetails = await response.json();
        // console.log(sectionDetails);
        return sectionDetails;
    } catch (error) {
        console.error('Error fetching sectionDetails:', error);
        return;
    }
};
