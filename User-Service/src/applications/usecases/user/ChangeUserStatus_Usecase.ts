import { userProducer } from "../../../events/userProducer";

export const ChangeUserStatus_Usecase = (dependencies: any) => {
  const {repository: { userRepository },} = dependencies;
  const executeFunction = async (userId:string) => {
    const response = await userRepository.ChangeUserStatus(userId);
    if (response) {
      console.log(response,"RREEESSS");
      
      if(response.status){
        
        const data={userId,status:response?.userStatus}
        await userProducer(data,'userTopic','changeStatus')
      }
      return { status: response.status, message: response.message };
    }
    return { status: false, message: "Highlight error" };
  };
  return { executeFunction };
};
