export const deletUserByName_useCase = (dependencies: any) => {
    const { userRepositoryDeleteUserByName } = dependencies.repositery;
    const executeFunction = async (data: string) => {
      
  
      const responce = await userRepositoryDeleteUserByName.deleteUser(data);
  
  
      if (responce.status) {
        return { status: true, data: responce.data };
      } else {
        return { status: false, message: responce.message };
      }
    };
    return { executeFunction };
  };
  