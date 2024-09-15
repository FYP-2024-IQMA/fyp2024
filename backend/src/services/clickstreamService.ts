import { Clickstream } from "../models/clickstreamModel";
import amqp from "amqplib";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
    region: 'ap-southeast-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

async function uploadToS3(queue: string, userID: string, newClickstream: string) {
    const key = `${queue}/${userID}.json`;
    const params = {
        Bucket: 'isb-raw-data-athena',
        Key: key,
    };
    let existingClickstream: any[] = [];

    try {
        const existingData = await s3.getObject(params).promise();
        let parsedData = JSON.parse(existingData.Body!.toString('utf-8'));
        if (Array.isArray(parsedData)) {
            existingClickstream = parsedData;
        }
        else {
            existingClickstream = [parsedData];
        }
    } catch (error: any) {
        if (error.code === 'NoSuchKey') {
            console.log("Creating new file");
        }
        else {
            console.error("Error uploading to S3", error);
        }
    }

    existingClickstream.push(JSON.parse(newClickstream));
    const lineDelimitedJson = existingClickstream.map(item => JSON.stringify(item)).join('\n');
    s3.putObject({
        ...params,
        Body: lineDelimitedJson,
        ContentType: "application/json"
    }).promise();
}

const QUEUE_NAMES = ['timeTaken', 'attemptsTaken'];

async function consumeMessage() {
    try {
        const conn = await amqp.connect(process.env.RABBITMQ_URL!);
        const channel = await conn.createChannel();

        for (const queue of QUEUE_NAMES) {
            await channel.assertQueue(queue);
            channel.consume(queue, async (message) => {
                if (message !== null) {
                    const data = message.content.toString();
                    let parsedData: Clickstream = JSON.parse(data);
                    try {
                        await uploadToS3(queue, parsedData.userID, data);
                        channel.ack(message);
                        console.log(message)
                    } catch (error) {
                        console.error(`Error processing message from ${QUEUE_NAMES[0]}: `, error);
                        channel.nack(message);
                    }
                }
            })
        }
    } catch (err) {
        console.error(`Error: ${err}`);
    }
}

export async function sendMessage(clickstream: Clickstream) {
    const queue = clickstream.eventType;
    const conn = await amqp.connect(process.env.RABBITMQ_URL!);
    const channel = await conn.createChannel();
    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(clickstream)));
    await consumeMessage();
}