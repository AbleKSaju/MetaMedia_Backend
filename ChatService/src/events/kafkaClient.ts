import { Kafka } from "kafkajs";

export const kafka =new Kafka({
    clientId:"chat",
    brokers:['localhost:9092']
})
