export const getMyAllStoriesForHighlight_Usecase = (dependencies: any) => {
    const { repository: {storyRepository} } = dependencies;
    const executeFunction = async (userId:string) => {  
        console.log("ENTER TO EXECUTE");
                    
      const response = await storyRepository.getMyAllStoriesForHighlight(userId)
      console.log(response,"response by usecase");
      
      if (response) {
          return { status: response.status, message: response.message, data: response.data };
        }
        return { status: false, message: "db crashed" };
    };
    return { executeFunction };
  };
  