
export const getAllUsers_usecasse = (dependencies: any) => {
  const { repository: { userRepository }} = dependencies;

  const executeFunction = async () => {    
  
    const responce= await userRepository.getAllUsers()
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
