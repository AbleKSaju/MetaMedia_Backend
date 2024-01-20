import { Kafka } from "kafkajs";

export const kafka =new Kafka({
    clientId:"auth",
    brokers:['localhost:9092']
})
