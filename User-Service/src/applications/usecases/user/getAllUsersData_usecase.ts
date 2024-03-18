export const getAllUsersData_usecase = (dependencies: any) => {
    const { repository: { userRepository }} = dependencies;
  
    const executeFunction = async () => {    
      const response= await userRepository.getAllUsersData()
      if(response.status){
          return {status:true,data:response.data}
      }else{
          return {status:false}
      }
    }
    return {
      executeFunction,
    }
  };