export const getMessages_UseCase = (dependencies: any) => {
    const {
      repository: { chatRepository },
    } = dependencies;
  
    const executeFunction = async (conversationId:string,senderId:string,receiverId:string) => {
      const response = await chatRepository.getMessages(conversationId,senderId,receiverId);
      console.log(response,"responseresponse");
      
      if (response) {
        return { status: response.status, data:response.data };
      }
      return { status: false, data:false};
    };
    return { executeFunction };
  };
  