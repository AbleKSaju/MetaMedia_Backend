import { Kafka } from "kafkajs";

export const kafka =new Kafka({
    clientId:"user",
    brokers:['demo-kafka:9092']
})
