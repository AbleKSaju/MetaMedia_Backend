
export const ChangeUserStatus_Usecase = (dependencies: any) => {
    
  const {repository: { authenticationRepository }} = dependencies;
  const executeFunction = async (userId:string,status:boolean) => {
    await authenticationRepository.ChangeUserStatus(userId,status);
  };
  return { executeFunction };
};
