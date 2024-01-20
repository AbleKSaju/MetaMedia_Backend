import { Kafka } from "kafkajs";

export const kafka =new Kafka({
    clientId:"user",
    brokers:['localhost:9092']
})
