
export const getUserData_Usecase = (dependencies: any) => {
  const { repository: {userRepository} } = dependencies;
  const executeFunction = async (email:string) => {
    console.log("I AM EXECUTE");
    console.log(email,"EMAIL");
    
    
    const response=await userRepository.finduser(email)
    console.log(response,"USERDATAresss");
    if (response) {
        return { status: response.status, message: response.message,userData:response.finduser };
      }
      return { status: false, message: "db crashed" };
  };
  return { executeFunction };
};
