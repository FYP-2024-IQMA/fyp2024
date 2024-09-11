export const getUnitDetails = async (sectionID: string, unitID: string) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/unit/getallunitsbysectionandunit/${sectionID}/${unitID}`;
        const response = await fetch(url);
        const unitDetails = await response.json();
        // console.log(unitDetails);
        return unitDetails;
    } catch (error) {
        console.error('Error fetching unitDetails:', error);
        return;
    }
};
