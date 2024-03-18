
export const GetAllGroupsOfUser_useCase = (dependencies: any) => {
    const { repository: { chatRepository } } = dependencies;
  
    const executeFunction = async (userId:any) => {
      
        
        const response = await chatRepository.getAllGroupsOfUser(userId);
        if (response.status) {
          return { status: response.status, data:response.data };
        }else{
        return { status: false, message: response.message };
      }
    };
    return { executeFunction };
  };