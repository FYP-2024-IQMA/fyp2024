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
exports.createAccountDemographics = createAccountDemographics;
exports.getAccountDemographicsById = getAccountDemographicsById;
exports.updateAccountCognitive = updateAccountCognitive;
exports.deleteAccountDemographics = deleteAccountDemographics;
const supabaseConfig_1 = __importDefault(require("../config/supabaseConfig"));
const accountsDemographicsModel_1 = require("../models/accountsDemographicsModel");
/* CREATE */
function createAccountDemographics(accountDemographics) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userID, careerStage, ethnicGroup, jobCategory, lifeStage, race, specialNeeds } = accountDemographics;
        const { data, error } = yield supabaseConfig_1.default
            .from("accountsdemographics")
            .insert({
            userID,
            careerStage,
            ethnicGroup,
            jobCategory,
            lifeStage,
            race,
            specialNeeds
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
function getAccountDemographicsById(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseConfig_1.default
            .from("accountsdemographics")
            .select("*")
            .eq("userID", userID)
            .single();
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return new accountsDemographicsModel_1.AccountsDemographics(data.userID, data.careerStage, data.ethnicGroup, data.jobCategory, data.lifeStage, data.race, data.specialNeeds);
        }
    });
}
/* UPDATE */
function updateAccountCognitive(accountDemographics) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userID, careerStage, ethnicGroup, jobCategory, lifeStage, race, specialNeeds } = accountDemographics;
        const updateFields = {};
        if (careerStage)
            updateFields.careerStage = careerStage;
        if (ethnicGroup)
            updateFields.ethnicGroup = ethnicGroup;
        if (jobCategory)
            updateFields.jobCategory = jobCategory;
        if (lifeStage)
            updateFields.lifeStage = lifeStage;
        if (race)
            updateFields.race = race;
        if (specialNeeds)
            updateFields.specialNeeds = specialNeeds;
        if (Object.keys(updateFields).length === 0) {
            throw new Error("No fields to update");
        }
        const { status, statusText, error } = yield supabaseConfig_1.default
            .from("accountsdemographics")
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
function deleteAccountDemographics(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const { status, statusText, error } = yield supabaseConfig_1.default
            .from("accountsdemographics")
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
