import { Clickstream } from "../models/clickstreamModel";
import amqp from "amqplib";
import { s3 } from "../config/awsConfig";

async function uploadToS3(queue: string, newClickstream: Clickstream) {
	const key = `${queue}/${newClickstream.userID}.json`;
	console.log(key);
	const params = {
		Bucket: "isb-raw-data-athena",
		Key: key,
	};
	let existingClickstream: any[] = [];

	try {
		const existingData = await s3.getObject(params).promise();
		console.log("existing data in service:", existingData);
		let fileContent = existingData.Body!.toString("utf-8");
		existingClickstream = fileContent
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

	existingClickstream.push(newClickstream);
	const lineDelimitedJson = existingClickstream
		.map((item) => JSON.stringify(item))
		.join("\n");
	// s3.putObject({
	// 	...params,
	// 	Body: lineDelimitedJson,
	// 	ContentType: "application/json",
	// }).promise();
	try {
		await s3
			.putObject({
				...params,
				Body: lineDelimitedJson,
				ContentType: "application/json",
			})
			.promise(); // Ensure upload is awaited
		console.log("Uploaded to S3 successfully!"); // Confirm upload success
	} catch (error) {
		console.error("Error uploading to S3:", error); // Log upload errors
	}
}

const QUEUE_NAMES = [
	"timeTaken",
	"attemptsTaken",
	"chatResponseTime",
	"numberOfInteractions",
];

async function consumeMessage() {
	try {
		console.log("consume message");
		const conn = await amqp.connect(process.env.RABBITMQ_URL!);
		const channel = await conn.createChannel();

		for (const queue of QUEUE_NAMES) {
			await channel.assertQueue(queue);
			console.log("look at this queue:", queue);
			channel.consume(queue, async (message) => {
				if (message !== null) {
					const data = message.content.toString();
					let parsedData: Clickstream = JSON.parse(data);
					try {
						await uploadToS3(queue, parsedData);
						console.log("Uploaded to S3");
						channel.ack(message);
						console.log(message);
					} catch (error) {
						console.error(
							`Error processing message from ${QUEUE_NAMES[0]}: `,
							error
						);
						channel.nack(message);
					}
				}
			});
		}
	} catch (err) {
		console.error(`Error: ${err}`);
	}
}

export async function sendMessage(clickstream: Clickstream) {
	const queue = clickstream.eventType;
	console.log("queue obtained:", queue);
	const conn = await amqp.connect(process.env.RABBITMQ_URL!);
	const channel = await conn.createChannel();
	await channel.assertQueue(queue);
	channel.sendToQueue(queue, Buffer.from(JSON.stringify(clickstream)));
	await consumeMessage();
}
