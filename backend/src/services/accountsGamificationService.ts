import supabase from "../config/supabaseConfig";
import { AccountsGamification } from "../models/accountsGamificationModel";
import * as resultService from "../services/resultService";
import * as unitService from "../services/unitService";
import * as sectionService from "../services/sectionService";

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

export async function getBadges(userID: string) {

    const { data: storageBadges, error } = await supabase.storage
        .from("badges")
        .list();

    if (error) {
        console.error(error);
        throw error;
    }

    if (storageBadges.length === 0) {
        throw new Error("Badge Not Found");
    }

    const totalSection = await sectionService.getAllSections();

    let badges = [];

    for (let i = totalSection.length - 1; i >= 0; i--) {

        const section = totalSection[i];
        let unitBadges = [];

        const totalUnit = await unitService.getAllUnitsBySection(
            section.sectionID
        );

        const completedUnit = await resultService.getUserProgress(
            userID,
            section.sectionID
        );

        const lockedUnit = Math.max(totalUnit.length - completedUnit, 0);

        for (let i = 0; i < lockedUnit; i++) {
            const { data: publicUrlData } = await supabase.storage
                .from("badges")
                .getPublicUrl(`locked.png`);

            if (publicUrlData) {
                unitBadges.push({
                    unitName: "LOCKED",
                    badgeUrl: publicUrlData.publicUrl
                });
            }
        }

        const withoutBadge = Math.max(0, completedUnit - storageBadges.length);
        const minBadges = completedUnit - withoutBadge;

        for (let i = 0; i < withoutBadge; i++) {
            const { data: publicUrlData } = await supabase.storage
                .from("badges")
                .getPublicUrl(`placeholder.png`);

            if (publicUrlData) {
                unitBadges.push({
                    unitName: "PLACEHOLDER",
                    badgeUrl: publicUrlData.publicUrl,
                });
            }
        }

        for (let i = minBadges; i > 0; i--) {
            const { data: publicUrlData } = await supabase.storage
                .from("badges")
                .getPublicUrl(`${section.sectionID}/unit${i}.png`);

            if (publicUrlData) {
                unitBadges.push({
                    unitName: "UNIT",
                    badgeUrl: publicUrlData.publicUrl,
                });
            }
        }

        for (let i = totalUnit.length - 1; i >= 0; i--) {
            const unit = totalUnit[i];
            unitBadges[i].unitName = unit.unitName;
        }


        badges.push({
            sectionID: section.sectionID,
            badges: unitBadges,
        });
        
    }
    
    return badges;

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