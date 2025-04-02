const formatDate = (date: Date) => {

    const day = date.getDate();
    const monthName = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(date);
    const fullYear = date.getFullYear();

    return `${day} ${monthName} ${fullYear}`;
}

export const getUserProgress = async (userID: string) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/userprogress/getuserprogressbyid/${userID}`;
        const response = await fetch(url);
        const userProgressDetails = await response.json();

        userProgressDetails.created_at = formatDate(new Date(userProgressDetails.created_at));

        return userProgressDetails;
    } catch (error) {
        console.error('Error fetching userProgress:', error);
        return;
    }
}