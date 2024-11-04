import amqp from "amqplib";
import { Feedback } from "../models/feedbackModel";
import { s3 } from "../config/awsConfig"; // Assuming you already have an AWS config for S3

// Create upload function
async function uploadToS3(queue: string, newFeedback: Feedback) {
	const key = `${queue}/${newFeedback.userID}.json`;
	const params = {
		Bucket: "isb-raw-data-athena",
		Key: key,
	};
	let existingFeedback: any[] = [];

	try {
		const existingData = await s3.getObject(params).promise();
		let fileContent = existingData.Body!.toString("utf-8");
		existingFeedback = fileContent
			.split("\n")
			.filter((line: string) => line.trim().length > 0)
			.map((line: string) => JSON.parse(line));
	} catch (error: any) {
		if (error.code === "NoSuchKey") {
			console.log("Creating new file");
		} else {
			console.error("Error uploading to S3", error);
		}
	}

	existingFeedback.push(newFeedback);
	const lineDelimitedJson = existingFeedback
		.map((item) => JSON.stringify(item))
		.join("\n");
	s3.putObject({
		...params,
		Body: lineDelimitedJson,
		ContentType: "application/json",
	}).promise();
}

// Define your queues (you can add more if necessary)
// const QUEUE_NAMES = ["feedback", "bug", "suggestion"];
const QUEUE_NAMES = ["feedback"];

// Create a function to consume messages
async function consumeMessage() {
    try {
        const conn = await amqp.connect(process.env.RABBITMQ_URL!);
        const channel = await conn.createChannel();

        for (const queue of QUEUE_NAMES) {
            await channel.assertQueue(queue);
            channel.consume(queue, async (message) => {
                if (message !== null) {
                    const data = message.content.toString();
                    let parsedData: Feedback = JSON.parse(data);
                    try {
                        await uploadToS3(queue, parsedData);
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

export async function sendMessage(feedback: Feedback) {
    const queue = "feedback";
    const conn = await amqp.connect(process.env.RABBITMQ_URL!);
    const channel = await conn.createChannel();
    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(feedback)));
    await consumeMessage();
}