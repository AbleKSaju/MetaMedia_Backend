
export const getStories_Usecase = (dependencies: any) => {
  const { repository: {storyRepository} } = dependencies;
  const executeFunction = async (userId:{userId:string}) => {
    console.log(userId,"Id");
    
    
    const response=await storyRepository.getStories(userId)
    console.log(response,"USERDATAresss");
    if (response) {
        return { status: response.status, message: response.message,data:response.data };
      }
      return { status: false, message: "db crashed" };
  };
  return { executeFunction };
};
