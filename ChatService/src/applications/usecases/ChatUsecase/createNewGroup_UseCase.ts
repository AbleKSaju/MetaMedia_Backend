export const CreateNewgroup_Usecase = (dependencies: any) => {
    const { repository: { chatRepository } } = dependencies;
  
    const executeFunction = async (data:any) => {
      
        
        const response = await chatRepository.CreateNewgroup(data);
        if (response.status) {
          return { status: response.status, data:response.data };
        }else{
        return { status: false, message: response.message };
      }
    };
    return { executeFunction };
  };