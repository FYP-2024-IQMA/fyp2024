"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccountAffective = createAccountAffective;
exports.getAccountAffectiveById = getAccountAffectiveById;
exports.updateAccountAffective = updateAccountAffective;
exports.deleteAccountAffective = deleteAccountAffective;
const supabaseConfig_1 = __importDefault(require("../config/supabaseConfig"));
const accountsAffectiveModel_1 = require("../models/accountsAffectiveModel");
/* CREATE */
function createAccountAffective(accountAffective) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userID, attitude, barriers, motivationalLevel, personality, reasons } = accountAffective;
        const { data, error } = yield supabaseConfig_1.default
            .from("accountsaffective")
            .insert({
            userID,
            attitude,
            barriers,
            motivationalLevel,
            personality,
            reasons
        })
            .select();
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return data;
        }
    });
}
/* READ */
function getAccountAffectiveById(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseConfig_1.default
            .from("accountsaffective")
            .select("*")
            .eq("userID", userID)
            .single();
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return new accountsAffectiveModel_1.AccountsAffective(data.userID, data.attitude, data.barriers, data.motivationalLevel, data.personality, data.reasons);
        }
    });
}
/* UPDATE */
function updateAccountAffective(accountAffective) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userID, attitude, barriers, motivationalLevel, personality, reasons } = accountAffective;
        const updateFields = {};
        if (attitude)
            updateFields.attitude = attitude;
        if (barriers)
            updateFields.barriers = barriers;
        if (motivationalLevel)
            updateFields.motivationalLevel = motivationalLevel;
        if (personality)
            updateFields.personality = personality;
        if (reasons)
            updateFields.reasons = reasons;
        if (Object.keys(updateFields).length === 0) {
            throw new Error("No fields to update");
        }
        const { status, statusText, error } = yield supabaseConfig_1.default
            .from("accountsaffective")
            .update(updateFields)
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
/* DELETE */
function deleteAccountAffective(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const { status, statusText, error } = yield supabaseConfig_1.default
            .from("accountsaffective")
            .delete()
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
