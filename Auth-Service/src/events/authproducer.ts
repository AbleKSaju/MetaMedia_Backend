import { kafka } from "../config/kafkaClient";

const producer = kafka.producer();
const DEFAULT_PARTITION = 0;
const DEFAULT_OFFSET = -1;

export const authProducer = async (sendData: any, topic: any, type: any) => {
  try {
    if (!sendData) {
      throw new Error("send data does not exist");
    }

    await producer.connect();

    let messageData;

    if (type === 'createUser') {
      messageData = sendData;
      
    } else if (type === 'create-search-user') {
      messageData = {
        userId: sendData._id,
        profileUrl: sendData.profile,
        followers: [],
        following: [],
        userName: sendData.name,
        blockedUsers:[]
      };
      
    } else {
      throw new Error("Invalid message type");
    }

    const messagePayload = {
      type,
      data: messageData,
      partition: DEFAULT_PARTITION,
      offset: DEFAULT_OFFSET
    };

    console.log('Data from the producer:', messageData);

    const result: any = await producer.send({
      topic,
      messages: [{ value: JSON.stringify(messagePayload) }],
    });

    if (result && result[0] && result[0]?.error) {
      throw new Error("Message production failed");
    }

    return result;
  } catch (error) {
    console.log("Error in the auth producer:", error);
  } finally {
    await producer.disconnect();
  }
};
