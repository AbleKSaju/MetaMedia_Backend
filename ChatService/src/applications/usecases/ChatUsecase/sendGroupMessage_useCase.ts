
export const SendGroupMessage_UseCase = (dependencies: any) => {
    const { repository: { chatRepository } } = dependencies;
  
    const executeFunction = async (data:any) => {
      
        
        const response = await chatRepository.sendGroupMessage(data);
        if (response.status) {
          return { status: response.status, data:response.data };
        }else{
        return { status: false, message: response.message };
      }
    };
    return { executeFunction };
  };