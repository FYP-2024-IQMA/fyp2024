export const getBadges = async (userID: string) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accounts/badges/${userID}`;
        const response = await fetch(url);
        const badges = await response.json();
        return badges;
    } catch (error) {
        console.error('Error fetching badges:', error);
        return "No badges found";
    }
}