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


export const getAllSectionDetails = async () => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/section/sectiondetails`;
        const response = await fetch(url);
        const sectionDetails = await response.json();
        // Testing
        // sectionDetails.push({
        //     sectionID: 'SEC0002',
        //     sectionName: 'Decision Making',
        // });
        // console.log(sectionDetails);
        return sectionDetails;
    } catch (error) {
        console.error('Error fetching all sectionDetails:', error);
        return;
    } 
}