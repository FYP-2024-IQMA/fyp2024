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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3 = new aws_sdk_1.default.S3({
    region: 'ap-southeast-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
function uploadToS3(queue, userID, newClickstream) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = `${queue}/${userID}.json`;
        const params = {
            Bucket: `isb-raw-data-athena`,
            Key: key,
        };
        try {
            const existingData = yield s3.getObject(params).promise();
            let existingClickstream = JSON.parse(existingData.Body.toString('utf-8'));
            if (Array.isArray(existingClickstream)) {
                existingClickstream.push(JSON.parse(newClickstream));
            }
            else {
                existingClickstream = [existingClickstream, JSON.parse(newClickstream)];
            }
            yield s3.putObject(Object.assign(Object.assign({}, params), { Body: JSON.stringify(existingClickstream), ContentType: "application/json" })).promise();
        }
        catch (error) {
            if (error.code === 'NoSuchKey') {
                yield s3.upload(Object.assign(Object.assign({}, params), { Body: JSON.stringify([JSON.parse(newClickstream)]), ContentType: "application/json" })).promise();
            }
            else {
                console.error("Error uploading to S3", error);
            }
        }
    });
}
const QUEUE_NAMES = ['timeTaken', 'attemptsTaken'];
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
                        const parsedData = JSON.parse(data);
                        try {
                            yield uploadToS3(queue, parsedData.userID, data);
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
function sendMessage(clickstream) {
    return __awaiter(this, void 0, void 0, function* () {
        const queue = clickstream.eventType;
        const conn = yield amqplib_1.default.connect(process.env.RABBITMQ_URL);
        const channel = yield conn.createChannel();
        yield channel.assertQueue(queue);
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(clickstream)));
        yield consumeMessage();
    });
}
