export const getUserByName_useCase = (dependencies: any) => {
    const { userRepositoryGetUserByName } = dependencies.repositery;
    const executeFunction = async (name: string) => {
      
  const responce=await userRepositoryGetUserByName.getUserByName(name)
      if (responce.status) {
        return { status: true, data: responce.data };
      } else {
        return { status: false, message: responce.message };
      }
    };
    return { executeFunction };
  };
  