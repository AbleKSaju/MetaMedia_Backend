
export const singleUserSendFile_Usecase = (dependencies: any) => {
    const { repository: { chatRepository } } = dependencies;
  
    const executeFunction = async (data:any) => {
      const {conversationId,receiverId,senderId} = data
      console.log(conversationId,receiverId,"conversationId,receiverId");
      if (conversationId === 'new' && receiverId) {
        const newCoversation = await chatRepository.addNewConversation(senderId, receiverId); 
        const response = await chatRepository.singleUserSendFile(data,newCoversation.data?._id);
        return { status: response.status, message: response.message,data:response.data };
    }
    
    const response = await chatRepository.singleUserSendFile(data,conversationId);
        if (response.status) {
          return { status: response.status, data:response.data };
        }else{
        return { status: false, message: response.message };
      }
    };
    return { executeFunction };
  };
