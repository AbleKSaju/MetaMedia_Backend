export const Message_UseCase = (dependencies: any) => {
    const {
      repository: { chatRepository },
    } = dependencies;
  
    const executeFunction = async (conversationId:string, senderId:string, message:string, receiverId:string,lastUpdate:any) => {
        try {
            if (conversationId === 'new' && receiverId) {
                const newCoversation = await chatRepository.addNewConversation(senderId, receiverId);
                const response  = await chatRepository.createMessage({conversationId:newCoversation.data?._id, senderId, message,lastUpdate});
                if(response){
                    return { status: response.status, message: response.message };
                }else{
                    return { status: response.status, message: response.message };
                }
            }
            const response  = await chatRepository.createMessage({conversationId, senderId, message,lastUpdate});
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
  