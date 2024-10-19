import AWS from "aws-sdk";

export const s3 = new AWS.S3({
    region: "ap-southeast-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
