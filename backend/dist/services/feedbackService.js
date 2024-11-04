"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = sendMessage;
const amqplib_1 = __importDefault(require("amqplib"));
const awsConfig_1 = require("../config/awsConfig"); // Assuming you already have an AWS config for S3
// Create upload function
function uploadToS3(queue, newFeedback) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = `${queue}/${newFeedback.userID}.json`;
        const params = {
            Bucket: "isb-raw-data-athena",
            Key: key,
        };
        let existingFeedback = [];
        try {
            const existingData = yield awsConfig_1.s3.getObject(params).promise();
            let fileContent = existingData.Body.toString("utf-8");
            existingFeedback = fileContent
                .split("\n")
                .filter((line) => line.trim().length > 0)
                .map((line) => JSON.parse(line));
        }
        catch (error) {
            if (error.code === "NoSuchKey") {
                console.log("Creating new file");
            }
            else {
                console.error("Error uploading to S3", error);
            }
        }
        existingFeedback.push(newFeedback);
        const lineDelimitedJson = existingFeedback
            .map((item) => JSON.stringify(item))
            .join("\n");
        awsConfig_1.s3.putObject(Object.assign(Object.assign({}, params), { Body: lineDelimitedJson, ContentType: "application/json" })).promise();
    });
}
// Define your queues (you can add more if necessary)
// const QUEUE_NAMES = ["feedback", "bug", "suggestion"];
const QUEUE_NAMES = ["feedback"];
// Create a function to consume messages
function consumeMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield amqplib_1.default.connect(process.env.RABBITMQ_URL);
            const channel = yield conn.createChannel();
            for (const queue of QUEUE_NAMES) {
                yield channel.assertQueue(queue);
                channel.consume(queue, (message) => __awaiter(this, void 0, void 0, function* () {
                    if (message !== null) {
                        const data = message.content.toString();
                        let parsedData = JSON.parse(data);
                        try {
                            yield uploadToS3(queue, parsedData);
                            channel.ack(message);
                            console.log(message);
                        }
                        catch (error) {
                            console.error(`Error processing message from ${QUEUE_NAMES[0]}: `, error);
                            channel.nack(message);
                        }
                    }
                }));
            }
        }
        catch (err) {
            console.error(`Error: ${err}`);
        }
    });
}
function sendMessage(feedback) {
    return __awaiter(this, void 0, void 0, function* () {
        const queue = "feedback";
        const conn = yield amqplib_1.default.connect(process.env.RABBITMQ_URL);
        const channel = yield conn.createChannel();
        yield channel.assertQueue(queue);
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(feedback)));
        yield consumeMessage();
    });
}
