// Helper to format Section Number from (SEC****)
export const formatSection = (sectionID: string): string => {
    const sectionNumber = sectionID.replace(/\D/g, '').replace(/^0+/, '');

    return sectionNumber;
};
