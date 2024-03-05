import schema from "../database/schema";

export default {
    addNewConversation: async (senderId:string, receiverId:string) => {
      try {  
        console.log(senderId,receiverId,"idssss");
        
        const response = await schema.Conversation.create({ members: [senderId, receiverId] });
        if (response) {
          return { status: true, message: "conversation created", data:response};
        } else {
          return { status: false, message: "Error occur" };
        }
      } catch (error) {
        console.log(error, "ER");
        return { error };
      }
    },
    
    getConversations: async (userId:string) => {
        try {          
          const receiverIds:any=[]
          const conversations:any = await schema.Conversation.find({ members: { $in: [userId] } });
          Promise.all(conversations.map(async (conversation:any) => {
             const id:string = conversation.members.find((member:string) => member !== userId);
             receiverIds.push({id:id,conversationId:conversation._id})
          }))
          if (receiverIds.length) {
            return { status: true, message: "receivers Found",data:receiverIds };
          } else {
            return { status: false, message: "receivers not Found" ,data:false};
          }
        } catch (error) {
          console.log(error, "ER");
          return { status: false, message: error ,data:false};
        }
      },
      createMessage: async ({conversationId, senderId, message}:any) => {
        try {  
          console.log(conversationId,"conversationId");
          console.log(senderId,"senderId");
          console.log(message,"message");
          const response = await schema.Messages.create({ conversationId, senderId, message });
          console.log(response,"responseresponseresponse");
          
          if (response) {
            return { status: true, message: 'Message sent successfully'};
          } else {
            return {status:false, message:'Message not send'}
          }
        } catch (error) {
          return { status:false, message:error };
        }
      },


      getMessages: async (conversationId:string,senderId:string,receiverId:string) => {
        try {  
          console.log("I MA getMessages");
          const checkMessages = async (conversationId:string) => {
            console.log(conversationId, 'conversationId')
            const messages = await schema.Messages.find({ conversationId });
            console.log(messages,"messagesmessagesmessages");
            
            const messageUserData = Promise.all(messages.map(async (message) => {
              
                return {  senderId: message.senderId, message: message.message,time:message.createdAt  }
            }));
            console.log(await messageUserData,"ddatta");
            
            return {status:true, data: await messageUserData}
          }

            if (conversationId === 'new') {
              console.log("I AM NEW ONE");
              
              const checkConversation:any = await schema.Conversation.find({ members: { $all: [senderId, receiverId] } });
              console.log("GOING TO CHECK");
              
              console.log(checkConversation,"checkConversation");
              console.log("Dyng TO CHECK");
              
              if (checkConversation.length > 0) {
                  await checkMessages(checkConversation[0]._id);
              } else {
                  return { status: true, data: [] }
              }
          } else {
            console.log("going to cehck message");
            
           return await checkMessages(conversationId);
          }
        } catch (error) {
          console.log(error,"ERR");
          
          return { status:false, data:true };
        }
      },

}