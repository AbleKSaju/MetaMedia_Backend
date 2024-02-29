export const getUsersByName_Usecase = (dependencies: any) => {
    const { repository: { userRepository }} = dependencies;
  
    const executeFunction = async (name:string) => {    
    const responce = await userRepository.getUsersByName(name)
       
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