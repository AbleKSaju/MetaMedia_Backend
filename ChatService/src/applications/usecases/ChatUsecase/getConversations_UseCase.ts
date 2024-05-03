export const getConversations_UseCase = (dependencies: any) => {
    const { repository: { chatRepository } } = dependencies;
    const executeFunction = async (userId:string) => {
      const response = await chatRepository.getConversations(userId);
      console.log(response,"responseresponseresponseresponse");
      
      if (response) {
        return { status: response.status, message: response.message, data:response.data };
      }
      return { status: false, message: "Chat error" ,data:false};
    };
    return { executeFunction };
  };
  