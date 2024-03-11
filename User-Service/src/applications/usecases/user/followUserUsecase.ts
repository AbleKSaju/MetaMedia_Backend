
export const followUser_Usecase = (dependecies: any) => {
    console.log("I am chooseInterest_Usecase" );
    
  const {repository: { userRepository }} = dependecies;
  const executeFunction = async (currentUserId:string , followedUserId: string) => {

    const response = await userRepository.followUser(currentUserId , followedUserId);
    if (response) {
      return { status: response.status, message: response.message };
    }
    return { status: false, message: "db crashed" };
  };
  return { executeFunction };
};
