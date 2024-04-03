import { kafka } from "./kafkaClient";


const consumer = kafka.consumer({
  groupId: "chat-service",
});

export const chatConsumer = async (dependencies: any) => {
  try {
    const {LikeNotification_usecase,CommentNotification_usecase,FollowNotification_usecase}=dependencies.useCase
    await consumer.connect();

    await consumer.subscribe({ topic: "Notification", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ message }:any) => {
        const bynerydata: any = message.value;
        const jsonstring: string = bynerydata?.toString();
        const jsondata = JSON.parse(jsonstring);
        const messagetype = jsondata?.type;
        console.log(messagetype,"messagetype");
        console.log(jsondata.data,"jsondatajsondatajsondata-------");
        
        if(messagetype == 'likePostNotification'){
          const response=  await LikeNotification_usecase(dependencies).executeFunction(jsondata.data)
          if(response.status){
            console.log("SUCESSSS");
            
          }else{
            console.log("failed");
            
          }
        }else if(messagetype=='CommentPostNotification'){
            const response=  await CommentNotification_usecase(dependencies).executeFunction(jsondata.data)
            if(response.status){
                console.log("SUCESSSS");
                
              }else{
                console.log("failed");
              }    
        }else if(messagetype=='followUserNotification'){
          console.log(jsondata.data,'HHIHIHIHI');
          
          const response=await FollowNotification_usecase(jsondata.data)
          console.log(response,'))))999999999999');
          
          if(response.status){
            console.log("SUCESSSS");
            
          }else{
            console.log("failed");
          }   
        }
       
      },
    });
  } catch (error) {
    console.log("Error in chat consumer", error);
  }
};
