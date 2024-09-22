export const getUnitDetails = async (sectionID: string, unitID: string) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/unit/getallunitsbysectionandunit/${sectionID}/${unitID}`;
        const response = await fetch(url);
        const unitDetails = await response.json();
        // console.log(unitDetails);
        return unitDetails;
    } catch (error) {
        console.error('Error fetching unitDetails:', error);
        return;
    }
};

export const numberOfUnitsPerSection = async (
    sectionID: string
): Promise<number> => {
    try {
        const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/unit/gettotalunit/${sectionID}`;
        const response = await fetch(url);
        const unitProgress = await response.json();
        return unitProgress;
    } catch (error) {
        console.error('Error while loading unit progress:', error);
        return 0;
    }
};
