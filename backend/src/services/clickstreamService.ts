import { Clickstream } from "../models/clickstreamModel";
import amqp from "amqplib";

export async function sendMessage(clickstream: Clickstream) {
    const queue = clickstream.eventType;
    const conn = await amqp.connect(process.env.RABBITMQ_URL!);
    const channel = await conn.createChannel();
    const res = await channel.assertQueue(queue);
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(clickstream)));
}