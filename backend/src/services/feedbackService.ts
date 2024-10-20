import amqp from "amqplib";
import bodyParser from "body-parser";
import express from "express";
import { s3 } from "../config/awsConfig"; // Assuming you already have an AWS config for S3
import { v4 as uuidv4 } from "uuid"; // For unique file naming

async function uploadToS3(queue: string, newClickstream: Clickstream) {
	const key = `${queue}/${newClickstream.userID}.json`;
	const params = {
		Bucket: "isb-raw-data-athena",
		Key: key,
	};
	let existingClickstream: any[] = [];

	try {
		const existingData = await s3.getObject(params).promise();
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
	s3.putObject({
		...params,
		Body: lineDelimitedJson,
		ContentType: "application/json",
	}).promise();
}

// Define your queues (you can add more if necessary)
const FEEDBACK_QUEUE = "feedback";

// Initialize Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Helper function to send feedback to RabbitMQ
async function sendFeedbackToQueue(feedback: any) {
	const conn = await amqp.connect(process.env.RABBITMQ_URL!);
	const channel = await conn.createChannel();
	await channel.assertQueue(FEEDBACK_QUEUE);
	channel.sendToQueue(FEEDBACK_QUEUE, Buffer.from(JSON.stringify(feedback)));
}

// POST endpoint to receive feedback
app.post("/submit-feedback", async (req, res) => {
	const { name, feedbackType, message, rating } = req.body;

	if (!name || !feedbackType || !message || !rating) {
		return res.status(400).json({ error: "Missing required fields" });
	}

	// Create feedback object
	const feedback = {
		id: uuidv4(), // Generate a unique ID for the feedback
		name,
		feedbackType,
		message,
		rating,
		timestamp: new Date().toISOString(),
	};

	try {
		// Send feedback to RabbitMQ queue
		await sendFeedbackToQueue(feedback);
		res.status(200).json({ message: "Feedback submitted successfully!" });
	} catch (error) {
		console.error("Error submitting feedback:", error);
		res.status(500).json({ error: "Failed to submit feedback" });
	}
});

// RabbitMQ consumer to handle feedback from the queue
async function consumeFeedbackMessages() {
	try {
		const conn = await amqp.connect(process.env.RABBITMQ_URL!);
		const channel = await conn.createChannel();

		// Assert feedback queue
		await channel.assertQueue(FEEDBACK_QUEUE);

		// Consume messages from the feedback queue
		channel.consume(FEEDBACK_QUEUE, async (message) => {
			if (message !== null) {
				const data = message.content.toString();
				const parsedData = JSON.parse(data);

				try {
					// Upload feedback to S3 (reusing uploadToS3 function)
					await uploadToS3(FEEDBACK_QUEUE, parsedData);
					channel.ack(message);
				} catch (error) {
					console.error(`Error uploading feedback to S3:`, error);
					channel.nack(message); // Nack if something goes wrong
				}
			}
		});
	} catch (err) {
		console.error("Error:", err);
	}
}

// Start consuming messages
consumeFeedbackMessages();

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
