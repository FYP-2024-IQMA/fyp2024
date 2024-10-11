import supabase from "../config/supabaseConfig";
import {
    AccountsGamification
} from "../models/accountsGamificationModel";

/* READ */
export async function getTop5Accounts(userID: string) {
    const { data, error } = await supabase
        .from("accountsgamification")
        .select("points, accounts!inner(userID, firstName, lastName)")
        .order("points", { ascending: false })
    
    if (error) {
        console.error(error);
        throw error;
    } else {

        let rank = 1;
        let previousPoints = data[0].points;

        const rankedData = data.map((record, index: number) => {
            if (index > 0 && record.points < previousPoints) {
                rank = rank + 1;
            }
            previousPoints = record.points;

            return {
                rank: rank,
                name: record.accounts.firstName + " " + record.accounts.lastName,
                points: record.points,
                userID: record.accounts.userID,
            };
        });

        // Filter accounts with rank <= 5 or userID = userID
        const filteredData = rankedData
            .filter((record) => record.rank <= 5 || record.userID === userID)
            .map(({ userID, ...rest }) => rest);

        return filteredData;
    }
}

export async function getGamificationData(userID: string) {
    const { data, error } = await supabase
        .from("accountsgamification")
        .select("*")
        .eq("userID", userID)
        .single();

    if (error) {
        console.error(error);
        throw error;
    } else {

        if (!data.lastUnitCompletionDate) {
            return new AccountsGamification(
                data.userID,
                data.points,
                data.streaks,
                null
            );
        }

        return new AccountsGamification(
            data.userID,
            data.points,
            data.streaks,
            new Date(data.lastUnitCompletionDate)
        );
    }
}

/* UPDATE */
export async function updatePoints(userID: string, points: number) {

    const accountGamificationData = await getGamificationData(userID);

    const { status, statusText, error } = await supabase
        .from("accountsgamification")
        .update({
            points: accountGamificationData.getPoints() + points,
        })
        .eq("userID", userID);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return { status, statusText };
    }
}