"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
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
const supabaseConfig_1 = __importDefault(require("../config/supabaseConfig"));
const accountsGamificationModel_1 = require("../models/accountsGamificationModel");
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
        const withoutBadge = Math.max(0, completedUnit - storageBadges.length);
        const minBadges = completedUnit - withoutBadge;
        for (let i = 0; i < withoutBadge; i++) {
            badges.push("Badge Design in Progress!");
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
