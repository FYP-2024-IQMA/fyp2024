const formatDate = (date: Date) => {

    const day = date.getDate();
    const monthName = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(date);
    const fullYear = date.getFullYear();

    return `${day} ${monthName} ${fullYear}`;
}

export const getUserDetails = async (userID: string) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accounts/getaccountbyid/${userID}`;
        const response = await fetch(url);
        const userDetails = await response.json();

        userDetails.dateCreated = formatDate(new Date(userDetails.dateCreated));

        return userDetails;
    } catch (error) {
        console.error('Error fetching userDetails:', error);
        return;
    }
}

interface userDetails {
    userID: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    hasOnboarded?: boolean;
}

export const editUserDetails = async (userDetails: userDetails) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/accounts/updateaccount`;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        });
        const updatedUserDetails = await response.json();
        return updatedUserDetails;
    } catch (error) {
        console.error('Error updating userDetails:', error);
        return;
    }
}