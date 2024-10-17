export const getUnitDetails = async (sectionID: string, unitID: string) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/unit/getallunitsbysectionandunit/${sectionID}/${unitID}`;
        const response = await fetch(url);
        const unitDetails = await response.json();
        // console.log(unitDetails);
        return unitDetails;
    } catch (error: any) {
        console.error('Error fetching unitDetails:', error.response.data);
        return;
    }
};

export const numberOfUnitsPerSection = async (
    sectionID: string
): Promise<number> => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/unit/gettotalunit/${sectionID}`;
        const response = await fetch(url);
        const unitProgress = await response.json();
        return unitProgress;
    } catch (error: any) {
        console.error(
            'Error while loading unit progress:',
            error.response.data
        );
        return 0;
    }
};
