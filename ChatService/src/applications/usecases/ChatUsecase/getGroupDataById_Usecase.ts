
export const GetGroupDataById_useCase = (dependencies: any) => {
    const { repository: { chatRepository } } = dependencies;
  
    const executeFunction = async (groupId:any) => {
      
        
        const response = await chatRepository.getGroupDataById(groupId);
        if (response.status) {
          return { status: response.status, data:response.data };
        }else{
        return { status: false, message: response.message };
      }
    };
    return { executeFunction };
  };