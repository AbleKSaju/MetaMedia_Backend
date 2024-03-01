import { Kafka } from "kafkajs";

export const kafka =new Kafka({
    clientId:"search",
    brokers:['localhost:9092']
})
 
