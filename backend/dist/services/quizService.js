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
exports.createQuiz = createQuiz;
exports.getAllQuizzes = getAllQuizzes;
exports.getQuizzesBySectionId = getQuizzesBySectionId;
exports.getNumberOfQuizzesPerUnit = getNumberOfQuizzesPerUnit;
exports.getNumberOfCompletedQuizzes = getNumberOfCompletedQuizzes;
exports.updateQuiz = updateQuiz;
const supabaseConfig_1 = __importDefault(require("../config/supabaseConfig"));
/* CREATE */
function createQuiz(Quiz) {
    return __awaiter(this, void 0, void 0, function* () {
        const { quizID, sectionID, unitID, lessonID, quizType, lastUpdated } = Quiz;
        const { data, error } = yield supabaseConfig_1.default
            .from("quiz")
            .insert({
            quizType,
            sectionID,
            lessonID,
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
// get all quizzes
function getAllQuizzes() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseConfig_1.default.from("quiz").select("*");
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return data;
        }
    });
}
// get all quizzes by sectionID
function getQuizzesBySectionId(sectionID) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseConfig_1.default
            .from("quiz")
            .select("*")
            .eq("sectionID", sectionID);
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return data;
        }
    });
}
// get number of quizzes per unit
function getNumberOfQuizzesPerUnit(unitID) {
    return __awaiter(this, void 0, void 0, function* () {
        const { count, error } = yield supabaseConfig_1.default
            .from("quiz")
            .select("quizID", { count: "exact" })
            .eq("unitID", unitID);
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return count;
        }
    });
}
// get number of completed quizzes by user: for circular progress on homepage
function getNumberOfCompletedQuizzes(unitID, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabaseConfig_1.default
                .from("quiz")
                .select("quizID")
                .eq("unitID", unitID);
            if (error) {
                console.error(error);
                throw error;
            }
            // if no quizzes found under the unit, return 0
            if (!data || data.length === 0) {
                return 0;
            }
            const quizIDs = data.map((quiz) => quiz.quizID);
            //get number completed by users
            const { count, error: resultError } = yield supabaseConfig_1.default
                .from("result")
                .select("quizID", { count: "exact" })
                .in("quizID", quizIDs)
                .eq("userID", userID);
            if (resultError) {
                console.error(resultError);
                throw resultError;
            }
            return count;
        }
        catch (error) {
            console.error("Error in getNumberofCompletedQuizzes", error);
            throw error;
        }
    });
}
/* UPDATE */
function updateQuiz(Quiz) {
    return __awaiter(this, void 0, void 0, function* () {
        const { quizID, sectionID, unitID, lessonID, quizType, lastUpdated } = Quiz;
        const updateFields = {};
        if (quizID)
            updateFields.quizID = quizID;
        if (sectionID)
            updateFields.sectionID = sectionID;
        if (unitID)
            updateFields.unitID = unitID;
        if (lessonID)
            updateFields.lessonID = lessonID;
        if (quizType)
            updateFields.quizType = quizType;
        if (lastUpdated)
            updateFields.lastUpdated = lastUpdated;
        if (Object.keys(updateFields).length === 0) {
            throw new Error("No fields to update");
        }
        const { status, statusText, error } = yield supabaseConfig_1.default
            .from("quiz")
            .update(updateFields)
            .eq("quizID", quizID);
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
// export async function deleteQuiz(sectionID: string) {
//     const { status, statusText, error } = await supabase
//         .from("quiz")
//         .delete()
//         .eq("sectionID", sectionID);
//     if (error) {
//         console.error(error);
//         throw error;
//     } else {
//         return { status, statusText };
//     }
// }
