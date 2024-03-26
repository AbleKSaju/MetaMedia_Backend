export const deleteMessage_UseCase = (dependencies: any) => {
    const { repository: { chatRepository } } = dependencies;
  
    const executeFunction = async (messageId:string) => {
        const response = await chatRepository.deleteMessage(messageId);
        if (response.status) {
          return { status: response.status, message: response.message };
        }else{
        return { status: false, message: response.message };
      }
    };
    return { executeFunction };
  };