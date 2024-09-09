import { Clickstream } from "../models/clickstreamModel";
import amqp from "amqplib";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
    region: 'ap-southeast-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

async function uploadToS3(queue: string, body: string) {
    const params = {
        Bucket: `isb-raw-data-athena`,
        Key: `${queue}/${Date.now()}.json`,
        Body: body
    };

    try {
        await s3.upload(params).promise();
    } catch (error) {
        console.error("Error uploading to S3", error);
    }
}

const QUEUE_NAMES = ['timeTaken', 'attemptsTaken'];

async function consumeMessage() {
    try {
        const conn = await amqp.connect(process.env.RABBITMQ_URL!);
        const channel = await conn.createChannel();

        for (const queue of QUEUE_NAMES) {
            const res = await channel.assertQueue(queue);
            channel.consume(queue, async (message) => {
                if (message !== null) {
                    const data = message.content.toString();
                    try {
                        await uploadToS3(queue, data);
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
    const res = await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(clickstream)));
    await consumeMessage();
}