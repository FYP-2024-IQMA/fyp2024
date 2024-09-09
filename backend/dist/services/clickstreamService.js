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
function sendMessage(clickstream) {
    return __awaiter(this, void 0, void 0, function* () {
        const queue = clickstream.eventType;
        const conn = yield amqplib_1.default.connect(process.env.RABBITMQ_URL);
        const channel = yield conn.createChannel();
        const res = yield channel.assertQueue(queue);
        yield channel.sendToQueue(queue, Buffer.from(JSON.stringify(clickstream)));
    });
}
