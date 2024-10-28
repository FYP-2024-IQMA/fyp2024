import * as resultService from "../services/resultService";
import * as sectionService from "../services/sectionService";
import * as unitService from "../services/unitService";

import { AccountsGamification } from "../models/accountsGamificationModel";
import { Result } from "../models/resultModel";
import { createResult } from "./resultService";
import supabase from "../config/supabaseConfig";

/* READ */
export async function getTop5Accounts(userID: string) {
	const { data, error } = await supabase
		.from("accountsgamification")
		.select("points, accounts!inner(userID, firstName, lastName, profilePic)")
		.order("points", { ascending: false });

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
				profilePic: record.accounts.profilePic,
			};
		});

		const userRank = rankedData
			.filter((record) => record.userID === userID)
			.map(({ userID, ...rest }) => rest);

		// Filter accounts with rank <= 5 or userID = userID
		const filteredData = rankedData
			.filter((record) => record.rank <= 5)
			.map(({ userID, ...rest }) => rest);

		return {
			user: {
				...userRank[0],
			},
			top5: filteredData,
		};
	}
}

export async function getGamificationData(userID: string) {
	const { data, error } = await supabase
		.from("accountsgamification")
		.select("*")
		.eq("userID", userID)
		.single();
	console.log("calling get gamification data");

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

	let badges = [];

	const totalSection = await sectionService.getAllSections();

	for (let i = totalSection.length - 1; i >= 0; i--) {
		const section = totalSection[i];
		let unitBadges = [];

		const { data: sectionBadges, error } = await supabase.storage
			.from(`badges`)
			.list(section.sectionID);

		if (error) {
			console.error(error);
			throw error;
		}

		const totalUnit = await unitService.getAllUnitsBySection(section.sectionID);

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
					badgeUrl: publicUrlData.publicUrl,
				});
			}
		}

		const withoutBadge = Math.max(0, completedUnit - sectionBadges.length);
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

export async function getLatestBadge(sectionID: string, unitID: string) {
	const { data: storageBadges, error } = await supabase.storage
		.from(`badges`)
		.list(sectionID);

	if (error) {
		console.error(error);
		throw error;
	}

	const completedUnit = unitID.replace(/\D/g, "").replace(/^0+/, "");

	const unitDetails = await unitService.getUnitDetailsBySectionAndUnit({
		sectionID,
		unitID,
	});

	if (
		storageBadges.length === 0 ||
		parseInt(completedUnit) > storageBadges.length
	) {
		const { data: publicUrlData } = await supabase.storage
			.from("badges")
			.getPublicUrl(`placeholder.png`);

		if (publicUrlData) {
			return {
				unitName: unitDetails.unitName,
				badgeUrl: publicUrlData.publicUrl,
			};
		}
	}

	const { data: publicUrlData } = await supabase.storage
		.from("badges")
		.getPublicUrl(`${sectionID}/unit${completedUnit}.png`);

	if (publicUrlData) {
		return {
			unitName: unitDetails.unitName,
			badgeUrl: publicUrlData.publicUrl,
		};
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

// Ensure that the GET request fetches accurate streak data for the specified user.
// for both login and normal streak calculation
// export async function getStreaks(userID: string) {
// 	try {
// 		const data = await getGamificationData(userID);
// 		return data.streaks;
// 	} catch (error) {
// 		throw error;
// 	}
// }

// Helper function to calculate streak based on last completion date
function calculateStreak(lastDate: Date | null, today: Date): number {
	if (!lastDate) return 1; // No last date, start a new streak

	const differenceInDays = today.getDate() - lastDate.getDate();

	console.log("today", today);
	console.log(differenceInDays);

	if (differenceInDays == 1) return 1; // Increment streak by 1 if difference is 1 day
	if (differenceInDays > 1) return 2; // Reset streak if difference is greater than 1 day

	return 0; // Default case, no streak update
}

// Ensure that the POST request correctly updates the user's streak when they complete a new unit.
export async function updateStreaksFromUnit(userID: string, quizID: number) {
	const resultInstance = new Result(userID, quizID, new Date());

	const createResultResponse = await createResult(resultInstance);
	const data = await getGamificationData(userID);
	console.log("from unit la");
	console.log("quiz is", quizID);
	console.log(data);
	try {
		if (data.lastUnitCompletionDate != null) {
			const lastUnitDate = new Date(data.lastUnitCompletionDate);
			const today = new Date();

			const daysSegment = calculateStreak(lastUnitDate, today);
			console.log("days segment is", daysSegment);
			let currentStreak = data.getStreaks();

			// Check the difference in days to update the streak
			if (daysSegment == 1) {
				// If the difference is 1 day, increment the streak
				console.log("diff 1 day, so + 1");
				currentStreak += 1;
			} else if (daysSegment > 1) {
				// If the difference is greater than 1 day, reset the streak to 1
				console.log("diff > 1 day, so reset to 1");
				currentStreak = 1;
			}

			const { status, statusText, error } = await supabase
				.from("accountsgamification")
				.update({
					streaks: currentStreak,
				})
				.eq("userID", userID);

			await supabase
				.from("accountsgamification")
				.update({
					lastUnitCompletionDate: new Date().toISOString(),
				})
				.eq("userID", userID);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
}

// Update user streak for homepage display
export async function updateStreaksFromLogin(userID: string) {
	const data = await getGamificationData(userID);
	try {
		const today = new Date();

		// Check if the user has logged in today
		if (data.lastUnitCompletionDate != null) {
			const lastUnitDate = new Date(data.lastUnitCompletionDate);

			// Calculate the difference in days between today and the last completion date
			const daysSegment = calculateStreak(lastUnitDate, today);
			let currentStreak = data.getStreaks();

			// If the user has logged in today, do not update the streak
			if (daysSegment === 0 || daysSegment === 1) {
				console.log(
					"last unit completion date is today or just did unit yesterday. streak unchanged"
				);
			} else if (daysSegment > 1) {
				// If the difference is greater than 1 day, reset the streak to 0
				console.log("last unit completion date v long ago. streak reset");
				currentStreak = 0;
			}

			const { status, statusText, error } = await supabase
				.from("accountsgamification")
				.update({
					streaks: currentStreak,
				})
				.eq("userID", userID);
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
}
