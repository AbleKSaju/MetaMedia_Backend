export const getUsersDataById_Usecase = (dependencies: any) => {
    const { repository: { userRepository } } = dependencies;
  
    const executeFunction = async (ids: any) => {
        console.log("i am executeFunction");
      const response = await userRepository.getUsersDataById(ids);
      console.log(response,"response from getUsersDataById_Usecase");
      if (response.status) {
        return { status: true , data: response.data };
      } else {
        return { status: false , data:false};
      }
    };
    return {
      executeFunction,
    };
  };
  