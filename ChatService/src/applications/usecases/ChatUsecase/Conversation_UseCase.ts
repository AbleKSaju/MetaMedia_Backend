export const Conversation_UseCase = (dependencies: any) => {
    const { repository: { chatRepository } } = dependencies;
  
    const executeFunction = async (senderId:string, receiverId:string) => {
      const conversationExist = await chatRepository.isConversationExist(senderId, receiverId);
      console.log(conversationExist,"conversationExistconversationExist");
      
      if(!conversationExist.status){
        console.log("Not exist");
        
        const response = await chatRepository.addNewConversation(senderId, receiverId);
        if (response) {
          return { status: response.status, message: response.message };
        }
      }else{
        return { status: false, message: "Conversation Exist" };
      }
      return { status: false, message: "Chat error" };
    };
    return { executeFunction };
  };