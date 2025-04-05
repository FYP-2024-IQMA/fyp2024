interface userStoneProgress {
    userID: string,
    last_completed_stone_index: number,
    current_stone_index: number | null,
    current_screen_index: number | null,
    current_screen_pathname: string | null,
}

export const createUserStoneProgress = async (userStoneProgress: userStoneProgress) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/userstoneprogress/createuserstoneprogress`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userStoneProgress),
        });

        const data = await response.json();
        console.log(data);
        console.log('Status: ', data.status);
        return data.status;
    } catch (error: any) {
        console.error('Error while creating user stone progress:', error.response.data);
    }
}

export const getUserStoneProgress = async (userID: string) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/userstoneprogress/getuserstoneprogress/${userID}`;
        const response = await fetch(url);
        const user_stone_progress = await response.json();
        return user_stone_progress;
    } catch (error) {
        console.error('Error while retrieving user stone progress:', error);
        return;
    }
};

export const updateUserStoneProgress = async (userStoneProgress: userStoneProgress) => {
    try {
        const url = `${process.env.EXPO_PUBLIC_LOCALHOST_URL}/userstoneprogress/updateuserstoneprogress`;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userStoneProgress)
        });
        const user_stone_progress = await response.json();
        console.log("Updated user stone progress:", response.status);
        return user_stone_progress;
    } catch (error) {
        console.error('Error updating user stone progress:', error);
        return;
    }
}

