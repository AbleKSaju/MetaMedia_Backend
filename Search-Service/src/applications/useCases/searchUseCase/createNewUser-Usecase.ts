export const createNewUser_useCase = (dependencies: any) => {
    const { userCreateRepo } = dependencies.repositery;
    const executeFunction = async (data: any) => {
      
  
      const responce = await userCreateRepo.createUser(data);
  
      if (responce.status) {
        return { status: true, data: responce.data };
      } else {
        return { status: false, message: responce.message };
      }
    };
    return { executeFunction };
  };
  