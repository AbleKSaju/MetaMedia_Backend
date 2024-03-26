
export const BlockAndUnblockUser_Usecase = (dependencies: any) => {
  const {repository: { userRepository },} = dependencies;
  const executeFunction = async (myId:string,userId:string) => {
    console.log(userId,"userIduserIduserIduserId");
    const response = await userRepository.BlockAndUnblockUser(myId,userId);
    if (response) {
      console.log(response,"RREEESSS");
      return { status: response.status, message: response.message ,data:response.data};
    }
    return { status: false, message: "Highlight error" };
  };
  return { executeFunction };
};
