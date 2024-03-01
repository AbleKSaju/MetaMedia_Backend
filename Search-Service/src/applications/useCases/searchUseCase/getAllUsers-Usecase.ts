export const getAllusers_useCase = (dependencies: any) => {
    const { userRopositoryGetAllUsers } = dependencies.repositery;
    const executeFunction = async () => {
    
  const responce=await userRopositoryGetAllUsers.getAllUsers()
      if (responce.status) {
        return { status: true, data: responce.data };
      } else {
        return { status: false, message: responce.message };
      }
    };
    return { executeFunction };
  };
  