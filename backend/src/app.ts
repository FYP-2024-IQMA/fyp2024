import accountsAffectiveRouter from "./routes/accountsAffectiveRouter";
import accountsCognitiveRouter from "./routes/accountsCognitiveRouter";
import accountsDemographicsRouter from "./routes/accountsDemographicsRouter";
import accountsGamificationRouter from "./routes/accountsGamificationRouter";
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
import feedbackRouter from "./routes/feedbackRouter";

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
app.use("/feedback", feedbackRouter);

// Start the Express server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
