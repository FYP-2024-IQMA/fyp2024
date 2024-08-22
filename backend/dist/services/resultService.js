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
exports.createResult = createResult;
exports.getAllResults = getAllResults;
exports.getResultByUserId = getResultByUserId;
exports.getNumberOfCompletedQuizzes = getNumberOfCompletedQuizzes;
exports.updateResult = updateResult;
const resultModel_1 = require("../models/resultModel");
const supabaseConfig_1 = __importDefault(require("../config/supabaseConfig"));
/* CREATE */
function createResult(Result) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userID, quizID, score, dateCreated } = Result;
        const { data, error } = yield supabaseConfig_1.default
            .from("result")
            .insert({
            quizID,
            score,
            userID,
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
function getAllResults() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseConfig_1.default
            .from("result")
            .select("*");
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return data;
        }
    });
}
function getResultByUserId(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseConfig_1.default
            .from("result")
            .select("*")
            .eq("userID", userID)
            .single();
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return new resultModel_1.Result(data.userID, data.quizID, data.score, data.dateCreated ? new Date(data.dateCreated) : new Date());
        }
    });
}
function getNumberOfCompletedQuizzes(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseConfig_1.default
            .from("result")
            .select("quizID")
            .eq("userID", userID);
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return data.length;
        }
    });
}
/* UPDATE */
function updateResult(Result) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userID, quizID, score, dateCreated } = Result;
        const updateFields = {};
        if (userID)
            updateFields.userID = userID;
        if (quizID)
            updateFields.quizID = quizID;
        if (dateCreated)
            updateFields.dateCreated = dateCreated;
        if (score)
            updateFields.score = score;
        if (Object.keys(updateFields).length === 0) {
            throw new Error("No fields to update");
        }
        const { status, statusText, error } = yield supabaseConfig_1.default
            .from("result")
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
// export async function deleteResult(userID: string) {
//     const { status, statusText, error } = await supabase
//         .from("result")
//         .delete()
//         .eq("userID", userID);
//     if (error) {
//         console.error(error);
//         throw error;
//     } else {
//         return { status, statusText };
//     }
// }
