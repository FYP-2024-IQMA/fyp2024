import { s3 } from "../config/awsConfig";

/* Utility function to extract the YouTube video ID */
function extractYouTubeID(url: string) {
    const regex =
        /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|shorts\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
}

async function retrieveVideoFromS3(sectionID: string, unitID?: string, lessonID?: string) {
    let videoKey = `${sectionID}/${sectionID}.mp4`;

    if (unitID) {
        videoKey = `${sectionID}/${unitID}/${unitID}.mp4`;
    }

    if (lessonID) {
        videoKey = `${sectionID}/${unitID}/lesson${lessonID}.mp4`;
    }

    const params = {
        Bucket: "vid-content",
        Key: videoKey,
    };

    try {
        await s3.headObject(params).promise();
        // If successful, the object exists
        const signedUrl = await s3.getSignedUrlPromise("getObject", params);
        return signedUrl;
    } catch (error: any) {
        if (error.code === "NotFound" || error.code === "NoSuchKey") {
            // console.log("The specified file does not exist.", sectionID, lessonID);
        } else {
            console.error("An error occurred:", error);
        }
        return null;
    }
}

export async function formatVideoUrl(url: string | null, sectionID: string, unitID?: string, lessonID?: string) {

    const signedUrl = await retrieveVideoFromS3(sectionID, unitID, lessonID);

    if (signedUrl) {
        return signedUrl;
    } 
    if (url) {
        return extractYouTubeID(url);
    }
    return null;

}


