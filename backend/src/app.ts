import accountsAffectiveRouter from "./routes/accountsAffectiveRouter";
import accountsCognitiveRouter from "./routes/accountsCognitiveRouter";
import accountsDemographicsRouter from "./routes/accountsDemographicsRouter";
import accountsRouter from "./routes/accountsRouter";
import accountsSocialRouter from "./routes/accountsSocialRouter";
import amqp from "amqplib/callback_api"; // RabbitMQ
import chatRouter from "./routes/chatRouter";
import clickstreamRouter from "./routes/clickstreamRouter";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import lessonRouter from "./routes/lessonRouter";
import questionRouter from "./routes/questionRouter";
import quizRouter from "./routes/quizRouter";
import resultRouter from "./routes/resultRouter";
import sectionRouter from "./routes/sectionRouter";
import unitRouter from "./routes/unitRouter";
import accountsGamificationRouter from "./routes/accountsGamificationRouter";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Route handling
app.use("/accounts", accountsRouter);
app.use("/accountsaffective", accountsAffectiveRouter);
app.use("/accountscognitive", accountsCognitiveRouter);
app.use("/accountsdemographics", accountsDemographicsRouter);
app.use("/accountssocial", accountsSocialRouter);
app.use("/quiz", quizRouter);
app.use("/quiz", questionRouter);
app.use("/result", resultRouter);
app.use("/unit", unitRouter);
app.use("/chat", chatRouter);
app.use("/lesson", lessonRouter);
app.use("/section", sectionRouter);
app.use("/clickstream", clickstreamRouter);
app.use("/accounts", accountsGamificationRouter);

// RabbitMQ Producer: Sends "timeTaken" data to RabbitMQ
app.post("/rabbitmq", (req, res) => {
	const data = req.body;
	console.log("Data received from frontend: ", data);

	// Connect to RabbitMQ
	amqp.connect("amqp://localhost", (error0, connection) => {
		if (error0) {
			throw error0;
		}

		connection.createChannel((error1, channel) => {
			if (error1) {
				throw error1;
			}

			const queues = ["session_logs", "response_times", "number_of_messages"];

			// Ensure all queues exist
			queues.forEach((queue) => {
				channel.assertQueue(queue, { durable: false });
			});

			console.log(queues);
			// Determine which queue to send the message to
			let queueToSend;

			if (data.type) {
				queueToSend = data.type;
			} else {
				return res.status(400).send("Invalid data type");
			}
			// Send the message to the appropriate queue
			const msg = JSON.stringify(data);

			channel.sendToQueue(queueToSend, Buffer.from(msg));

			console.log(` [x] Sent to ${queueToSend}: ${msg}`);

			// Close the connection after sending the message
			setTimeout(() => {
				connection.close();
				res.send("Data sent to RabbitMQ");
			}, 500);
		});
	});
});

// Start the Express server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
