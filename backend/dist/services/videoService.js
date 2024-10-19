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
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatVideoUrl = formatVideoUrl;
const awsConfig_1 = require("../config/awsConfig");
/* Utility function to extract the YouTube video ID */
function extractYouTubeID(url) {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|shorts\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
}
function retrieveVideoFromS3(sectionID, lessonID) {
    return __awaiter(this, void 0, void 0, function* () {
        let videoKey = `${sectionID}/${sectionID}.mp4`;
        if (lessonID) {
            videoKey = `${sectionID}/lesson${lessonID}.mp4`;
        }
        const params = {
            Bucket: "vid-content",
            Key: videoKey,
        };
        try {
            yield awsConfig_1.s3.headObject(params).promise();
            // If successful, the object exists
            const signedUrl = yield awsConfig_1.s3.getSignedUrlPromise("getObject", params);
            return signedUrl;
        }
        catch (error) {
            if (error.code === "NotFound" || error.code === "NoSuchKey") {
                // console.log("The specified file does not exist.", sectionID, lessonID);
            }
            else {
                console.error("An error occurred:", error);
            }
            return null;
        }
    });
}
function formatVideoUrl(url, sectionID, lessonID) {
    return __awaiter(this, void 0, void 0, function* () {
        const signedUrl = yield retrieveVideoFromS3(sectionID, lessonID);
        if (signedUrl) {
            return signedUrl;
        }
        if (url) {
            return extractYouTubeID(url);
        }
        return null;
    });
}
