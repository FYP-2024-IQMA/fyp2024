export const getBadges = async (userID: string) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accounts/badges/${userID}`;
        const response = await fetch(url);
        const badges = await response.json();
        return badges;
    } catch (error) {
        console.error('Error fetching badges:', error);
        return [];
    }
}

export const getStreak = async (userID: string) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accounts/gamificationdata/${userID}`;
        const response = await fetch(url);
        const streak = await response.json();
        return streak;
    } catch (error) {
        console.error('Error fetching Streak:', error);
        return [];
    }
}