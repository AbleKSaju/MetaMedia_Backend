export const getSearchUser_Usecase = (dependencies: any) => {
    const { repository: { userRepository }} = dependencies;
  
    const executeFunction = async (user:string,userId:string) => {    
    
      const responce= await userRepository.getSearchUsers(user,userId)
      if(responce.status){
          return {status:true,data:responce.data}
      }else{
          return {status:false}
      }
    }
    return {
      executeFunction,
    }
  };
  