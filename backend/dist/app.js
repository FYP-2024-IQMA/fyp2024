"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accountsAffectiveRouter_1 = __importDefault(require("./routes/accountsAffectiveRouter"));
const accountsCognitiveRouter_1 = __importDefault(require("./routes/accountsCognitiveRouter"));
const accountsDemographicsRouter_1 = __importDefault(require("./routes/accountsDemographicsRouter"));
const accountsRouter_1 = __importDefault(require("./routes/accountsRouter"));
const accountsSocialRouter_1 = __importDefault(require("./routes/accountsSocialRouter"));
const callback_api_1 = __importDefault(require("amqplib/callback_api")); // RabbitMQ
const chatRouter_1 = __importDefault(require("./routes/chatRouter"));
const clickstreamRouter_1 = __importDefault(require("./routes/clickstreamRouter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const lessonRouter_1 = __importDefault(require("./routes/lessonRouter"));
const questionRouter_1 = __importDefault(require("./routes/questionRouter"));
const quizRouter_1 = __importDefault(require("./routes/quizRouter"));
const resultRouter_1 = __importDefault(require("./routes/resultRouter"));
const sectionRouter_1 = __importDefault(require("./routes/sectionRouter"));
const unitRouter_1 = __importDefault(require("./routes/unitRouter"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// Route handling
app.use("/accounts", accountsRouter_1.default);
app.use("/accountsaffective", accountsAffectiveRouter_1.default);
app.use("/accountscognitive", accountsCognitiveRouter_1.default);
app.use("/accountsdemographics", accountsDemographicsRouter_1.default);
app.use("/accountssocial", accountsSocialRouter_1.default);
app.use("/quiz", quizRouter_1.default);
app.use("/quiz", questionRouter_1.default);
app.use("/result", resultRouter_1.default);
app.use("/unit", unitRouter_1.default);
app.use("/chat", chatRouter_1.default);
app.use("/lesson", lessonRouter_1.default);
app.use("/section", sectionRouter_1.default);
app.use("/clickstream", clickstreamRouter_1.default);
// RabbitMQ Producer: Sends "timeTaken" data to RabbitMQ
app.post("/rabbitmq", (req, res) => {
    const { timeTaken } = req.body;
    console.log("timetaken:", timeTaken);
    // Connect to RabbitMQ
    callback_api_1.default.connect("amqp://localhost", (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }
            const queue = "response_times";
            const msg = JSON.stringify({ timeTaken });
            // Ensure the queue exists
            channel.assertQueue(queue, { durable: false });
            // Send message to RabbitMQ queue
            channel.sendToQueue(queue, Buffer.from(msg));
            console.log(` [x] Sent ${msg}`);
        });
        // Close the connection after sending the message
        setTimeout(() => {
            connection.close();
        }, 500);
    });
    res.send("Time sent to RabbitMQ");
});
// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
