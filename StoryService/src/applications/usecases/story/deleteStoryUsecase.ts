export const DeleteStory_Usecase = (dependencies: any) => {
  const {
    repository: { storyRepository },
  } = dependencies;
  const executeFunction = async (userId: string, storyId: string) => {
    const response = await storyRepository.deleteStory(userId,storyId)
    if(response){
        return {status:true,message:"Story deleted"}
    }else{
        return {status:false,message:"Story Error"}
    }   
  };
  return {executeFunction}
};
