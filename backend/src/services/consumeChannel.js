const amqp = require("amqplib/callback_api");
const fs = require("fs");

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

		console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

		channel.consume(
			queue,
			(msg) => {
				const data = JSON.parse(msg.content.toString());

				console.log(" [x] Received %s", data);

				// Write to a file
				const logEntry = `Time taken: ${data.timeTaken}, Timestamp: ${new Date(
					data.timestamp
				).toISOString()}\n`;

				fs.appendFile("rabbitmq_logs.txt", logEntry, (err) => {
					if (err) throw err;
					console.log("Log written to file");
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
