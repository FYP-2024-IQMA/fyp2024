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
exports.createAccountSocial = createAccountSocial;
exports.getAccountSocialById = getAccountSocialById;
exports.updateAccountSocial = updateAccountSocial;
exports.deleteAccountSocial = deleteAccountSocial;
const supabaseConfig_1 = __importDefault(require("../config/supabaseConfig"));
const accountsSocialModel_1 = require("../models/accountsSocialModel");
/* CREATE */
function createAccountSocial(accountSocial) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userID, compLiteracy, relationshipToPeers, socialBackground, tendency } = accountSocial;
        const { data, error } = yield supabaseConfig_1.default
            .from("accountssocial")
            .insert({
            userID,
            compLiteracy,
            relationshipToPeers,
            socialBackground,
            tendency,
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
function getAccountSocialById(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseConfig_1.default
            .from("accountssocial")
            .select("*")
            .eq("userID", userID)
            .single();
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return new accountsSocialModel_1.AccountsSocial(data.userID, data.compLiteracy, data.relationshipToPeers, data.socialBackground, data.tendency);
        }
    });
}
/* UPDATE */
function updateAccountSocial(accountSocial) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userID, compLiteracy, relationshipToPeers, socialBackground, tendency } = accountSocial;
        const updateFields = {};
        if (compLiteracy)
            updateFields.compLiteracy = compLiteracy;
        if (relationshipToPeers)
            updateFields.relationshipToPeers = relationshipToPeers;
        if (socialBackground)
            updateFields.socialBackground = socialBackground;
        if (tendency)
            updateFields.tendency = tendency;
        if (Object.keys(updateFields).length === 0) {
            throw new Error("No fields to update");
        }
        const { status, statusText, error } = yield supabaseConfig_1.default
            .from("accountssocial")
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
function deleteAccountSocial(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const { status, statusText, error } = yield supabaseConfig_1.default
            .from("accountssocial")
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
