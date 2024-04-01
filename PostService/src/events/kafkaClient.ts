import { Kafka } from "kafkajs";

export const kafka =new Kafka({
    clientId:"post",
    brokers:['localhost:9092']
})
