export const getMessages_UseCase = (dependencies: any) => {
    const { repository: { chatRepository }} = dependencies;
  
    const executeFunction = async (conversationId:string,senderId:string,receiverId:string) => {
      console.log(conversationId,senderId,receiverId,"conversationId:string,senderId:string,receiverId");
      
      const response = await chatRepository.getMessages(conversationId,senderId,receiverId);
      
      if (response) {
        return { status: response.status, data:response.data };
      }
      return { status: false, data:false};
    };
    return { executeFunction };
  };
  