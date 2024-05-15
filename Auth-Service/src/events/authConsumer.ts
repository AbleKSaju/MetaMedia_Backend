import { kafka } from "../config/kafkaClient";
import { changeUserStatusController } from "../libs/controller";

const consumer = kafka.consumer({
  groupId: "auth-service",
});

export const authConsumer = async (dependencies: any) => {
  try {
    await consumer.connect();

    await consumer.subscribe({ topic: "userTopic", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const bynerydata: any = message.value;
        const jsonstring: string = bynerydata?.toString();
        const jsondata = JSON.parse(jsonstring);
        const messagetype = jsondata?.type;
        
        if(messagetype == 'changeStatus'){
            await changeUserStatusController(dependencies,jsondata.data)
        }
        //funrther funtion are handle in here
      },
    });
  } catch (error) {
    console.log("Error in auth consumer", error);
  }
};
