const amqp = require("amqplib/callback_api");
const fs = require("fs");
const path = require("path");

// Path to the JSON file where logs will be saved
const logFilePath = path.join(__dirname, "rabbitmq_logs.json");

amqp.connect("amqp://localhost", (error0, connection) => {
	if (error0) {
		throw error0;
	}

	connection.createChannel((error1, channel) => {
		if (error1) {
			throw error1;
		}

		const queue = "response_times";

		channel.assertQueue(queue, { durable: false });

		console.log(` [*] Waiting for messages in ${queue}. To exit press CTRL+C`);

		channel.consume(
			queue,
			(msg) => {
				// Parse the message content
				const data = JSON.parse(msg.content.toString());

				console.log(" [x] Received", data);

				// Read the existing JSON file
				fs.readFile(logFilePath, "utf8", (err, fileContent) => {
					let logs = [];

					// If the file exists and has content, parse it
					if (!err && fileContent) {
						try {
							logs = JSON.parse(fileContent); // Existing logs
						} catch (parseErr) {
							console.error("Error parsing existing log file:", parseErr);
						}
					}

					// Append the new message to the logs array
					logs.push(data);

					// Write the updated logs array back to the JSON file
					fs.writeFile(logFilePath, JSON.stringify(logs, null, 2), (err) => {
						if (err) throw err;
						console.log("Log written to JSON file");
					});
				});

				// Acknowledge the message to RabbitMQ
				channel.ack(msg);
			},
			{
				noAck: false, // Ensure RabbitMQ waits for acknowledgment before removing the message from the queue
			}
		);
	});
});
