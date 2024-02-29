export const Message_UseCase = (dependencies: any) => {
    const {
      repository: { chatRepository },
    } = dependencies;
  
    const executeFunction = async (conversationId:string, senderId:string, message:string, receiverId:string) => {
        try {
            console.log("Ia m executeFunction");
            if (conversationId === 'new' && receiverId) {
                console.log("I AM NEW");
                const newCoversation = await chatRepository.addNewConversation(senderId, receiverId);
                const response  = await chatRepository.createMessage({conversationId:newCoversation._id, senderId, message});
                if(response){
                    return { status: response.status, message: response.message };
                }else{
                    return { status: response.status, message: response.message };
                }
            }
            console.log("GOING TO USECASE RESPONSE");
            
            const response  = await chatRepository.createMessage({conversationId, senderId, message});
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
  