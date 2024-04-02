import { Kafka } from "kafkajs";

export const kafka =new Kafka({
    clientId:"search",
    brokers:['demo-kafka:9092']
})
 
