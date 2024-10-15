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
        console.log("Updated user details:", response.status);
        return updatedUserDetails;
    } catch (error) {
        console.error('Error updating userDetails:', error);
        return;
    }
}

export function calculateTotalProgress(
    i: number,
    totalUnits: number,
    getLessonIds: any[]
) {
    const uniqueAlphabets = new Set(getLessonIds);
    // Get the count of unique alphabets for key takeaway count
    const uniqueAlphabetCount = uniqueAlphabets.size;

    // regular total progress
    // 5 = UnitIntro + UnitAIntro + CheatSheet + RealityCheck + Assessment
    // uniqueAlphabetCount = no. of KeyTakeaway
    let totalProgress = 5 + getLessonIds.length * 2 + uniqueAlphabetCount;

    if (i === 0) {
        // to account for sectionIntro
        totalProgress += 1;
    } else if (i === totalUnits - 1) {
        // to account for final assessment Intro & final assessment
        totalProgress += 2;
    }

    // console.log('Total Progress:', totalProgress);
    return totalProgress;
}

export function calculateKTProgress(
    lessons: any[],
    completedLessonCount: number
) {
    const lessonCounts = lessons.reduce((acc, lessonID) => {
        acc[lessonID] = (acc[lessonID] || 0) + 1;
        return acc;
    }, {});

    const completedLessons = lessons
        .slice(0, completedLessonCount)
        .reduce((acc, lessonID) => {
            acc[lessonID] = acc[lessonID] || 0; // Initialize if not already present
            if (acc[lessonID] < lessonCounts[lessonID]) {
                acc[lessonID]++; // Increment if below total occurrences
            }
            return acc;
        }, {});

    return Object.keys(lessonCounts).reduce((progress, lessonID) => {
        return (
            progress +
            (completedLessons[lessonID] === lessonCounts[lessonID] ? 1 : 0)
        );
    }, 0);
}

