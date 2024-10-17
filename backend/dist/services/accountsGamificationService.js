"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTop5Accounts = getTop5Accounts;
exports.getGamificationData = getGamificationData;
exports.getBadges = getBadges;
exports.updatePoints = updatePoints;
exports.updateStreaksFromUnit = updateStreaksFromUnit;
exports.updateStreaksFromLogin = updateStreaksFromLogin;
const accountsGamificationModel_1 = require("../models/accountsGamificationModel");
const resultModel_1 = require("../models/resultModel");
const resultService_1 = require("./resultService");
const supabaseConfig_1 = __importDefault(require("../config/supabaseConfig"));
const resultService = __importStar(require("../services/resultService"));
/* READ */
function getTop5Accounts(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseConfig_1.default
            .from("accountsgamification")
            .select("points, accounts!inner(userID, firstName, lastName)")
            .order("points", { ascending: false });
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            let rank = 1;
            let previousPoints = data[0].points;
            const rankedData = data.map((record, index) => {
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
                .map((_a) => {
                    var { userID } = _a, rest = __rest(_a, ["userID"]);
                    return rest;
                });
            return filteredData;
        }
    });
}
function getGamificationData(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseConfig_1.default
            .from("accountsgamification")
            .select("*")
            .eq("userID", userID)
            .single();
        console.log("calling get gamification data");
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            if (!data.lastUnitCompletionDate) {
                return new accountsGamificationModel_1.AccountsGamification(data.userID, data.points, data.streaks, null);
            }
            return new accountsGamificationModel_1.AccountsGamification(data.userID, data.points, data.streaks, new Date(data.lastUnitCompletionDate));
        }
    });
}
function getBadges(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const completedUnit = yield resultService.getNoOfCompletedUnit(userID);
        let badges = [];
        const { data: storageBadges, error } = yield supabaseConfig_1.default.storage
            .from("badges")
            .list();
        if (error) {
            console.error(error);
            throw error;
        }
        if (storageBadges.length === 0) {
            throw new Error("Badge Not Found");
        }
        const designed = storageBadges
            .map((badge) => badge.name)
            .filter((badge) => badge.includes("badge"));
        const withoutBadge = Math.max(0, completedUnit - designed.length);
        const minBadges = completedUnit - withoutBadge;
        for (let i = 0; i < withoutBadge; i++) {
            const { data: publicUrlData } = yield supabaseConfig_1.default.storage
                .from("badges")
                .getPublicUrl(`placeholder.png`);
            if (publicUrlData) {
                badges.push(publicUrlData.publicUrl);
            }
        }
        for (let i = minBadges; i > 0; i--) {
            const { data: publicUrlData } = yield supabaseConfig_1.default.storage
                .from("badges")
                .getPublicUrl(`badge${i}.png`);
            if (publicUrlData) {
                badges.push(publicUrlData.publicUrl);
            }
        }
        return badges;
    });
}
/* UPDATE */
function updatePoints(userID, points) {
    return __awaiter(this, void 0, void 0, function* () {
        const accountGamificationData = yield getGamificationData(userID);
        const { status, statusText, error } = yield supabaseConfig_1.default
            .from("accountsgamification")
            .update({
                points: accountGamificationData.getPoints() + points,
            })
            .eq("userID", userID);
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return { status, statusText };
        }
    });
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
function calculateStreak(lastDate, today) {
    if (!lastDate)
        return 1; // No last date, start a new streak
    const differenceInDays = Math.round((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    console.log("today", today);
    console.log(differenceInDays);
    if (differenceInDays == 1)
        return 1; // Increment streak by 1 if difference is 1 day
    if (differenceInDays > 1)
        return 2; // Reset streak if difference is greater than 1 day
    return 0; // Default case, no streak update
}
// Ensure that the POST request correctly updates the user's streak when they complete a new unit.
function updateStreaksFromUnit(userID, quizID) {
    return __awaiter(this, void 0, void 0, function* () {
        const resultInstance = new resultModel_1.Result(userID, quizID, new Date());
        const createResultResponse = yield (0, resultService_1.createResult)(resultInstance);
        const data = yield getGamificationData(userID);
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
                }
                else if (daysSegment > 1) {
                    // If the difference is greater than 1 day, reset the streak to 1
                    console.log("diff > 1 day, so reset to 1");
                    currentStreak = 1;
                }
                const { status, statusText, error } = yield supabaseConfig_1.default
                    .from("accountsgamification")
                    .update({
                        streaks: currentStreak,
                    })
                    .eq("userID", userID);
            }
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
// Update user streak for homepage display
function updateStreaksFromLogin(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield getGamificationData(userID);
        try {
            const today = new Date();
            // Check if the user has logged in today
            if (data.lastUnitCompletionDate != null) {
                const lastUnitDate = new Date(data.lastUnitCompletionDate);
                // Calculate the difference in days between today and the last completion date
                const daysSegment = calculateStreak(lastUnitDate, today);
                let currentStreak = data.getStreaks();
                // If the user has logged in today, do not update the streak
                if (daysSegment === 0) {
                    console.log("last unit completion date is today. streak unchanged");
                }
                else if (daysSegment > 1) {
                    // If the difference is greater than 1 day, reset the streak to 0
                    console.log("last unit completion date v long ago. streak reset");
                    currentStreak = 0;
                }
                else {
                    console.log("diff is 1 means streak + 1");
                    currentStreak += 1;
                }
                const { status, statusText, error } = yield supabaseConfig_1.default
                    .from("accountsgamification")
                    .update({
                        streaks: currentStreak,
                    })
                    .eq("userID", userID);
            }
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
