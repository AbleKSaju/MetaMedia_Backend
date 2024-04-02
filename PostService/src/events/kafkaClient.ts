import { Kafka } from "kafkajs";

export const kafka =new Kafka({
    clientId:"post",
    brokers:['demo-kafka:9092']
})
