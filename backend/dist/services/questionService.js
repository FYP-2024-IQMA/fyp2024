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
exports.getQuizQuestions = getQuizQuestions;
const supabaseConfig_1 = __importDefault(require("../config/supabaseConfig"));
/* READ */
function getQuizQuestions(sectionID, unitID, lessonID) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = supabaseConfig_1.default
            .from("question")
            .select("quizID, quiz!inner(quizID), *")
            .order("questionNo")
            .eq("quiz.sectionID", sectionID);
        if (lessonID) {
            // get lesson quiz questions
            query = query
                .eq("quiz.unitID", unitID)
                .eq("quiz.lessonID", lessonID)
                .eq("quiz.quizType", "lesson");
        }
        else {
            // get unit quiz questions
            if (unitID) {
                query = query
                    .eq("quiz.unitID", unitID)
                    .eq("quiz.quizType", "unit");
            }
            else {
                // get section quiz questions
                query = query
                    .eq("quiz.quizType", "section");
            }
        }
        const { data, error } = yield query;
        if (error) {
            console.error(error);
            throw error;
        }
        const cleanedData = data.map((_a) => {
            var { quiz } = _a, rest = __rest(_a, ["quiz"]);
            return rest;
        });
        return cleanedData;
    });
}
