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
const uuid_1 = require("uuid");
const s3 = new aws_sdk_1.default.S3({
    region: 'ap-southeast-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
function uploadToS3(queue, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            Bucket: `isb-raw-data-athena`,
            Key: `${queue}/${(0, uuid_1.v4)()}.json`,
            Body: body
        };
        try {
            yield s3.upload(params).promise();
        }
        catch (error) {
            console.error("Error uploading to S3", error);
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
                const res = yield channel.assertQueue(queue);
                channel.consume(queue, (message) => __awaiter(this, void 0, void 0, function* () {
                    if (message !== null) {
                        const data = message.content.toString();
                        try {
                            yield uploadToS3(queue, data);
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
        const res = yield channel.assertQueue(queue);
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(clickstream)));
        yield consumeMessage();
    });
}
