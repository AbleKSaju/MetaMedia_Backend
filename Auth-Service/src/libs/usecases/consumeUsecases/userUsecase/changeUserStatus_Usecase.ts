
export const ChangeUserStatus_Usecase = (dependencies: any) => {
    console.log("55createUserUsecase");
    
  const {repository: { authenticationRepository }} = dependencies;
  const executeFunction = async (userId:string,status:boolean) => {
    console.log(userId,status,"userIduserIduserIduserId");
    await authenticationRepository.ChangeUserStatus(userId,status);
  };
  return { executeFunction };
};
