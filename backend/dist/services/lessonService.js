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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNoOfLessonPerUnit = getNoOfLessonPerUnit;
exports.getLesson = getLesson;
exports.getAllLessons = getAllLessons;
const supabaseConfig_1 = __importDefault(require("../config/supabaseConfig"));
const videoService = __importStar(require("./videoService"));
/* READ */
// get all lessons in the specific unit
function getNoOfLessonPerUnit(sectionID, unitID) {
    return __awaiter(this, void 0, void 0, function* () {
        const { count, error } = yield supabaseConfig_1.default
            .from("lesson")
            .select("*", { count: "exact" })
            .eq("sectionID", sectionID)
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
// get a specific lesson
function getLesson(sectionID, unitID, lessonID) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseConfig_1.default
            .from("lesson")
            .select("*")
            .eq("sectionID", sectionID)
            .eq("unitID", unitID)
            .eq("lessonID", lessonID);
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            let formattedLessonURL = data[0].lessonURL;
            if (formattedLessonURL) {
                formattedLessonURL = yield videoService.formatVideoUrl(formattedLessonURL, sectionID, unitID, lessonID);
            }
            let description = data[0].lessonDescription;
            let formattedDescription = description
                ? description.split(/\r?\n/)
                : null;
            let takeaway = data[0].lessonKeyTakeaway;
            let formattedTakeaway = takeaway
                ? takeaway.split(/\r?\n/)
                : null;
            const text = data[0].lessonCheatSheet;
            // when there is 2 headers in the text
            const regex = /^(?:\p{Emoji}|\p{So})[^\n]*:$/gmu;
            const headers = text ? text.match(regex) : null;
            if (headers != null) {
                const sections = text ? text.split(regex) : null;
                sections === null || sections === void 0 ? void 0 : sections.shift();
                const formattedCheatSheet = headers.reduce((acc, header, index) => {
                    if (sections != null) {
                        acc[header.trim()] = sections[index]
                            .trim()
                            .split(/\r?\n/)
                            .map((sentence) => sentence.trim());
                    }
                    return acc;
                }, {});
                return Object.assign(Object.assign({}, data[0]), { lessonURL: formattedLessonURL, lessonDescription: formattedDescription, lessonKeyTakeaway: formattedTakeaway, lessonCheatSheet: formattedCheatSheet });
            }
            //when there is no emoji in the headers
            const regex2 = /^(?:|\p{So})[^\n]*:$/gmu;
            const headers2 = text ? text.match(regex2) : null;
            if (headers2 != null) {
                const sections = text === null || text === void 0 ? void 0 : text.split(/^(?:.*?)(?=\s*:\s*$)/gmu);
                sections === null || sections === void 0 ? void 0 : sections.shift();
                const formattedCheatSheet = headers2.reduce((acc, header, index) => {
                    if (sections != null) {
                        acc[header.trim()] = sections[index]
                            .trim()
                            .split(/:?\r?\n/)
                            .map((sentence) => sentence.trim())
                            .filter((sentence) => sentence !== "");
                    }
                    return acc;
                }, {});
                return Object.assign(Object.assign({}, data[0]), { lessonURL: formattedLessonURL, lessonDescription: formattedDescription, lessonKeyTakeaway: formattedTakeaway, lessonCheatSheet: formattedCheatSheet });
            }
            //when there is no headers
            const sentences = text === null || text === void 0 ? void 0 : text.split(/\r?\n/);
            if (sentences != null) {
                return Object.assign(Object.assign({}, data[0]), { lessonURL: formattedLessonURL, lessonDescription: formattedDescription, lessonKeyTakeaway: formattedTakeaway, lessonCheatSheet: sentences });
            }
            return Object.assign(Object.assign({}, data[0]), { lessonURL: formattedLessonURL, lessonDescription: formattedDescription, lessonKeyTakeaway: formattedTakeaway, lessonCheatSheet: [] });
        }
    });
}
function getAllLessons(sectionID, unitID) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseConfig_1.default
            .from("lesson")
            .select("*")
            .eq("sectionID", sectionID)
            .eq("unitID", unitID);
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            const formattedLessons = yield Promise.all(data.map((lesson) => __awaiter(this, void 0, void 0, function* () {
                let formattedLessonURL = lesson.lessonURL;
                if (formattedLessonURL) {
                    formattedLessonURL = yield videoService.formatVideoUrl(lesson.lessonURL, sectionID, unitID, lesson.lessonID);
                }
                let description = lesson.lessonDescription;
                let formattedDescription = description
                    ? description.split(/\r?\n/)
                    : null;
                let takeaway = lesson.lessonKeyTakeaway;
                let formattedTakeaway = takeaway
                    ? takeaway.split(/\r?\n/)
                    : null;
                const text = lesson.lessonCheatSheet;
                // when there are headers with emojis
                const regex = /^(?:\p{Emoji}|\p{So})[^\n]*:$/gmu;
                const headers = text ? text.match(regex) : null;
                if (headers != null) {
                    const sections = text ? text.split(regex) : null;
                    sections === null || sections === void 0 ? void 0 : sections.shift();
                    const formattedCheatSheet = headers.reduce((acc, header, index) => {
                        if (sections != null) {
                            acc[header.trim()] = sections[index]
                                .trim()
                                .split(/\r?\n/)
                                .map((sentence) => sentence.trim());
                        }
                        return acc;
                    }, {});
                    return Object.assign(Object.assign({}, lesson), { lessonURL: formattedLessonURL, lessonDescription: formattedDescription, lessonKeyTakeaway: formattedTakeaway, lessonCheatSheet: formattedCheatSheet });
                }
                // when there are no emojis in the headers
                const regex2 = /^(?:|\p{So})[^\n]*:$/gmu;
                const headers2 = text ? text.match(regex2) : null;
                if (headers2 != null) {
                    const sections = text === null || text === void 0 ? void 0 : text.split(/^(?:.*?)(?=\s*:\s*$)/gmu);
                    sections === null || sections === void 0 ? void 0 : sections.shift();
                    const formattedCheatSheet = headers2.reduce((acc, header, index) => {
                        if (sections != null) {
                            acc[header.trim()] = sections[index]
                                .trim()
                                .split(/:?\r?\n/)
                                .map((sentence) => sentence.trim())
                                .filter((sentence) => sentence !== "");
                        }
                        return acc;
                    }, {});
                    return Object.assign(Object.assign({}, lesson), { lessonURL: formattedLessonURL, lessonDescription: formattedDescription, lessonKeyTakeaway: formattedTakeaway, lessonCheatSheet: formattedCheatSheet });
                }
                // when there are no headers
                const sentences = text === null || text === void 0 ? void 0 : text.split(/\r?\n/);
                if (sentences != null) {
                    return Object.assign(Object.assign({}, lesson), { lessonURL: formattedLessonURL, lessonDescription: formattedDescription, lessonKeyTakeaway: formattedTakeaway, lessonCheatSheet: sentences });
                }
                return Object.assign(Object.assign({}, lesson), { lessonURL: formattedLessonURL, lessonDescription: formattedDescription, lessonKeyTakeaway: formattedTakeaway, lessonCheatSheet: [] });
            })));
            return formattedLessons;
        }
    });
}
