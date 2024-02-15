export const AddStory_useCase = (dependencies: any) => {
  const { repository: {storyRepository} } = dependencies;
  const executeFunction = async (data: any) => {
    const {userId}=data;
    console.log("ENTER TO EXECUTE");
    const userData = await storyRepository.findUser(userId);
    console.log(userData, "RES FROM USECASE");
    if(!userData.status){        
          await storyRepository.createUser(data);
    }    
    const response = await storyRepository.addStory(data);
    console.log(response ," from useCase");
    
    if(response){
        return {status:true,message:"Story added",data:response}
    }else{
        return {status:false,message:"Story Error",data:false}
    }    
  };
  return { executeFunction };
};
