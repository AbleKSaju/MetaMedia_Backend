export const Message_UseCase = (dependencies: any) => {
    const {
      repository: { chatRepository },
    } = dependencies;
  
    const executeFunction = async (conversationId:string, senderId:string, message:string, receiverId:string,lastUpdate:any) => {
        try {
            console.log("Ia m executeFunction");
            console.log(conversationId, senderId, message, receiverId,"conversationId:string, senderId:string, message:string, receiverId");
            
            if (conversationId === 'new' && receiverId) {
                const newCoversation = await chatRepository.addNewConversation(senderId, receiverId);
                console.log(newCoversation,"newCoversation");
                const response  = await chatRepository.createMessage({conversationId:newCoversation.data?._id, senderId, message,lastUpdate});
                if(response){
                    return { status: response.status, message: response.message };
                }else{
                    return { status: response.status, message: response.message };
                }
            }
            console.log("GOING TO USECASE RESPONSE");
            
            const response  = await chatRepository.createMessage({conversationId, senderId, message,lastUpdate});
            console.log(response,"responseresponse");
            
            if(response){
                return { status: response.status, message: response.message };
            }else{
                return { status: response.status, message: response.message };
            }
        } catch (error) {
            return { status: false, message: error };
        }
    };
    return { executeFunction };
  };
  