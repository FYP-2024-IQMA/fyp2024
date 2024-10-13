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
exports.getAllSections = getAllSections;
exports.getSectionDetails = getSectionDetails;
const supabaseConfig_1 = __importDefault(require("../config/supabaseConfig"));
const videoService = __importStar(require("./videoService"));
// import { s3 } from "../config/awsConfig";
// /* Utility function to extract the YouTube video ID */
// function extractYouTubeID(url: string) {
//     const regex =
//         /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|shorts\/)([a-zA-Z0-9_-]{11})/;
//     const matches = url.match(regex);
//     return matches ? matches[1] : null;
// }
// async function retrieveVideoFromS3(sectionID: string, lessonID?: string) {
//     let videoKey = `${sectionID}/${sectionID}.mp4`;
//     if (lessonID) {
//         videoKey = `${sectionID}/${lessonID}.mp4`;
//     }
//     const params = {
//         Bucket: "vid-content",
//         Key: videoKey,
//     }
//     try {
//         await s3.headObject(params).promise();
//         // If successful, the object exists
//         const signedUrl = await s3.getSignedUrlPromise("getObject", params);
//         return signedUrl;
//     } catch (error: any) {
//         if (error.code === "NotFound" || error.code === "NoSuchKey") {
//             console.error("The specified file does not exist.");
//         } else {
//             console.error("An error occurred:", error);
//         }
//         return null;
//     }
// }
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
        return data;
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
            // const signedUrl = await videoService.retrieveVideoFromS3(sectionID);
            // if (signedUrl) {
            //     data.introductionURL = signedUrl;
            // } else {
            //     if (data.introductionURL) {
            //         data.introductionURL = videoService.extractYouTubeID(data.introductionURL);
            //     }
            // }
            if (data.introductionURL) {
                data.introductionURL = yield videoService.formatVideoUrl(data.introductionURL, sectionID);
            }
            return Object.assign(Object.assign({}, data), { finalAssessmentIntro: data.finalAssessmentIntro
                    ? data.finalAssessmentIntro.split(/\r\n/)
                    : [], finalScenario: data.finalScenario
                    ? data.finalScenario.split(/\r\n/)
                    : [], introductionURL: data.introductionURL });
        }
    });
}
