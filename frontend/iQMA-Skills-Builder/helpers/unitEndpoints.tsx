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

// get all units in database
export const getAllUnits = async (sectionID: string, unitID: string) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/unit/getallunits`;
        const response = await fetch(url);
        const unitDetails = await response.json();
        return unitDetails;
    } catch (error: any) {
        console.error('Error fetching all units:', error.response.data);
        return;
    }
};

export const getUnitsForSection = async (sectionID: string) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/unit/getallunitsbysection/${sectionID}`;
        const response = await fetch(url);
        const unitDetails = await response.json();
        // console.log(unitDetails);
        return unitDetails;
    } catch (error: any) {
        console.error('Error fetching units:', error.response.data);
        return;
    }
};