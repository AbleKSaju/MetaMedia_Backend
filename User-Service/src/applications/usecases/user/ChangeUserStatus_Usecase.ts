
export const ChangeUserStatus_Usecase = (dependencies: any) => {
  const {repository: { userRepository },} = dependencies;

  const executeFunction = async (userId:string) => {
    console.log(userId,"userIduserIduserIduserId");
    
    const response = await userRepository.ChangeUserStatus(userId);
    console.log(response,"responseresponseresponse");
    
    if (response) {
      return { status: response.status, message: response.message };
    }
    return { status: false, message: "Highlight error" };
  };
  return { executeFunction };
};
