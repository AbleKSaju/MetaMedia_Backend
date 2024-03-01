export const Conversation_UseCase = (dependencies: any) => {
    const { repository: { chatRepository } } = dependencies;
  
    const executeFunction = async (senderId:string, receiverId:string) => {
      const response = await chatRepository.addNewConversation(senderId, receiverId);
      if (response) {
        return { status: response.status, message: response.message };
      }
      return { status: false, message: "Chat error" };
    };
    return { executeFunction };
  };
  