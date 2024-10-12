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
exports.checkIfCompletedQuiz = checkIfCompletedQuiz;
exports.getUserProgress = getUserProgress;
exports.getNoOfCompletedLesson = getNoOfCompletedLesson;
exports.getNoOfCompletedUnit = getNoOfCompletedUnit;
const supabaseConfig_1 = __importDefault(require("../config/supabaseConfig"));
/* CREATE */
function createResult(Result) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userID, quizID } = Result;
        const { error } = yield supabaseConfig_1.default
            .from("result")
            .insert({
            quizID,
            userID,
        });
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return userID;
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
function checkIfCompletedQuiz(userID, quizID) {
    return __awaiter(this, void 0, void 0, function* () {
        const { count, error } = yield supabaseConfig_1.default
            .from("result")
            .select("*", { count: "exact" })
            .eq("userID", userID)
            .eq("quizID", quizID);
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return count > 0;
        }
    });
}
/*
Get the User Progress:
- no. of completed sections quiz
- no. of completed units quiz per section
- no. of completed lessons & unit quiz per unit
*/
function getUserProgress(userID, sectionID, unitID) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = supabaseConfig_1.default
            .from("result")
            .select("quizID, quiz!inner(quizID)", { count: "exact" })
            .eq("userID", userID);
        // solely for circular progress
        // if unitID is provided, get number of completed lessons & unit for that unit
        if (unitID) {
            query = query
                .eq("quiz.sectionID", sectionID)
                .eq("quiz.unitID", unitID)
                .neq("quiz.quizType", "section");
        }
        else {
            // for home page stone progress - whether to be lit up or not
            // if sectionID is provided, get number of completed units for that section
            if (sectionID) {
                query = query
                    .eq("quiz.quizType", "unit")
                    .eq("quiz.sectionID", sectionID);
            }
            else {
                // for header section
                // if sectionID is not provided, get number of completed sections
                query = query.eq("quiz.quizType", "section");
            }
        }
        const { count, error } = yield query;
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return count;
        }
    });
}
/*
Get the User Progress:
- no. of completed lessons per unit
*/
function getNoOfCompletedLesson(userID, sectionID, unitID) {
    return __awaiter(this, void 0, void 0, function* () {
        const { count, error } = yield supabaseConfig_1.default
            .from("result")
            .select("quizID, quiz!inner(quizID)", { count: "exact" })
            .eq("userID", userID)
            .eq("quiz.sectionID", sectionID)
            .eq("quiz.unitID", unitID)
            .eq("quiz.quizType", "lesson");
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return count;
        }
    });
}
/*
Get the User Progress:
- no. of completed lessons per unit
*/
function getNoOfCompletedUnit(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const { count, error } = yield supabaseConfig_1.default
            .from("result")
            .select("quizID, quiz!inner(quizID)", { count: "exact" })
            .eq("userID", userID)
            .eq("quiz.quizType", "unit");
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return count;
        }
    });
}
