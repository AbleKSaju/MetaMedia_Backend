export const getSearchUser_Usecase = (dependencies: any) => {
    const { repository: { userRepository }} = dependencies;
  
    const executeFunction = async (user:string,userId:string) => {    
    
      const response= await userRepository.getSearchUsers(user,userId)
      console.log(response,"responceresponceresponceresponceresponce");
      
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
  