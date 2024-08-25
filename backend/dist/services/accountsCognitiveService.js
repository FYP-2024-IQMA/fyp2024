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
exports.createAccountCognitive = createAccountCognitive;
exports.getAccountCognitiveById = getAccountCognitiveById;
exports.updateAccountCognitive = updateAccountCognitive;
exports.deleteAccountCognitive = deleteAccountCognitive;
const supabaseConfig_1 = __importDefault(require("../config/supabaseConfig"));
const accountsCognitiveModel_1 = require("../models/accountsCognitiveModel");
/* CREATE */
function createAccountCognitive(accountCognitive) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userID, educationalLevel, languageAbilities, learningPreferences, litNumProficiency, priorKnowledge } = accountCognitive;
        const { data, error } = yield supabaseConfig_1.default
            .from("accountscognitive")
            .insert({
            userID,
            educationalLevel,
            languageAbilities,
            learningPreferences,
            litNumProficiency,
            priorKnowledge
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
function getAccountCognitiveById(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseConfig_1.default
            .from("accountscognitive")
            .select("*")
            .eq("userID", userID)
            .single();
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return new accountsCognitiveModel_1.AccountsCognitive(data.userID, data.educationalLevel, data.languageAbilities, data.learningPreferences, data.litNumProficiency, data.priorKnowledge);
        }
    });
}
/* UPDATE */
function updateAccountCognitive(accountCognitive) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userID, educationalLevel, languageAbilities, learningPreferences, litNumProficiency, priorKnowledge } = accountCognitive;
        const updateFields = {};
        if (educationalLevel)
            updateFields.educationalLevel = educationalLevel;
        if (languageAbilities)
            updateFields.languageAbilities = languageAbilities;
        if (learningPreferences)
            updateFields.learningPreferences = learningPreferences;
        if (litNumProficiency)
            updateFields.litNumProficiency = litNumProficiency;
        if (priorKnowledge)
            updateFields.priorKnowledge = priorKnowledge;
        if (Object.keys(updateFields).length === 0) {
            throw new Error("No fields to update");
        }
        const { status, statusText, error } = yield supabaseConfig_1.default
            .from("accountscognitive")
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
function deleteAccountCognitive(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const { status, statusText, error } = yield supabaseConfig_1.default
            .from("accountscognitive")
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
