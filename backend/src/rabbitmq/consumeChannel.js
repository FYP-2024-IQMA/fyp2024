const amqp = require("amqplib/callback_api");
const fs = require("fs");
const path = require("path");

// Function to handle message consumption and file writing
function handleQueue(queueName, channel) {
	const logFilePath = path.join(__dirname, `${queueName}_logs.json`);

	channel.assertQueue(queueName, { durable: false });

	console.log(` [*] Waiting for messages in ${queueName}. To exit press CTRL+C`);

	channel.consume(
		queueName,
		(msg) => {
			// Parse the message content
			const data = JSON.parse(msg.content.toString());

			console.log(` [x] Received from ${queueName}:`, data);

			// Read the existing JSON file
			fs.readFile(logFilePath, "utf8", (err, fileContent) => {
				let logs = [];

				// If the file exists and has content, parse it
				if (!err && fileContent) {
					try {
						logs = JSON.parse(fileContent); // Existing logs
					} catch (parseErr) {
						console.error(`Error parsing existing log file for ${queueName}:`, parseErr);
					}
				}

				// Append the new message to the logs array
				logs.push(data);

				// Write the updated logs array back to the JSON file
				fs.writeFile(logFilePath, JSON.stringify(logs, null, 2), (err) => {
					if (err) throw err;
					console.log(`Log written to ${queueName}_logs.json file`);
				});
			});

			// Acknowledge the message to RabbitMQ
			channel.ack(msg);
		},
		{
			noAck: false, // Ensure RabbitMQ waits for acknowledgment before removing the message from the queue
		}
	);
}

amqp.connect("amqp://localhost", (error0, connection) => {
	if (error0) {
		throw error0;
	}

	connection.createChannel((error1, channel) => {
		if (error1) {
			throw error1;
		}

		// List of queues
		const queues = ["response_times", "session_logs", "number_of_messages"];

		// Set up a consumer for each queue
		queues.forEach((queueName) => {
			handleQueue(queueName, channel);
		});
	});
});
