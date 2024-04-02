import { Kafka } from "kafkajs";

export const kafka =new Kafka({
    clientId:"chat",
    brokers:['demo-kafka:9092']
})
