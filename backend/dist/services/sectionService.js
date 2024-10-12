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
exports.getAllSections = getAllSections;
exports.getSectionDetails = getSectionDetails;
const supabaseConfig_1 = __importDefault(require("../config/supabaseConfig"));
/* Utility function to extract the YouTube video ID */
function extractYouTubeID(url) {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|shorts\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
}
const getSectionDuration = (sectionID) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabaseConfig_1.default
        .from("lesson")
        .select("lessonDuration")
        .eq("sectionID", sectionID);
    if (error) {
        console.error(error);
        throw error;
    }
    return Math.ceil(data.reduce((acc, curr) => acc + curr.lessonDuration, 0));
});
/* READ */
function getAllSections() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseConfig_1.default
            .from("section")
            .select("sectionID, sectionName");
        if (error) {
            console.error(error);
            throw error;
        }
        const transformedData = yield Promise.all(data.map((section) => __awaiter(this, void 0, void 0, function* () {
            const sectionDuration = yield getSectionDuration(section.sectionID);
            return Object.assign(Object.assign({}, section), { sectionDuration });
        })));
        // else {
        // 	const formattedData = data.map((section) => {
        // 		if (section.introductionURL) {
        // 			section.introductionURL = extractYouTubeID(section.introductionURL);
        // 		}
        // 		return {
        // 			...section,
        // 			finalAssessmentIntro: section.finalAssessmentIntro
        // 				? section.finalAssessmentIntro.split(/\r\n/)
        // 				: [],
        // 		};
        // 	});
        // 	return formattedData;
        // };
        return transformedData;
    });
}
function getSectionDetails(sectionID) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseConfig_1.default
            .from("section")
            .select("*")
            .eq("sectionID", sectionID)
            .single();
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            if (data.introductionURL) {
                data.introductionURL = extractYouTubeID(data.introductionURL);
            }
            return Object.assign(Object.assign({}, data), { finalAssessmentIntro: data.finalAssessmentIntro
                    ? data.finalAssessmentIntro.split(/\r\n/)
                    : [], finalScenario: data.finalScenario
                    ? data.finalScenario.split(/\r\n/)
                    : [], introductionURL: data.introductionURL });
        }
    });
}
