import { kafka } from "./kafkaClient";

const producer = kafka.producer();
const DEFAULT_PARTITION = 0;
const DEFAULT_OFFSET = -1;

export const postProducer = async (sendData: any, topic: any, type: any) => {
  try {
    if (!sendData) {
      throw new Error("send data does not exist");
    }

    await producer.connect();

    let messageData;

    if (type === 'likePostNotification') {
        messageData = {
            sender_id: sendData.sender_id,
            receiver_id: sendData.receiver_id,
            notificationType: sendData.notificationType,
            postId: sendData.postId,
            postImage: sendData.postImage,
          };
      
    }  else if(type=='CommentPostNotification'){

        messageData = {
            sender_id: sendData.sender_id,
            receiver_id: sendData.receiver_id,
            notificationType: sendData.notificationType,
            postId: sendData.postId,
            postImage: sendData.postImage,
            comment:sendData.comment,
            
          };
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
