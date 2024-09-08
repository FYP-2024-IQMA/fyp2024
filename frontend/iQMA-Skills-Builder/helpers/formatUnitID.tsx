// Helper to format Unit Number from (UNIT****)
export const formatUnit = (unitID: string): string => {
    const unitNumber = unitID.replace(/\D/g, '').replace(/^0+/, '');

    return unitNumber;
};
