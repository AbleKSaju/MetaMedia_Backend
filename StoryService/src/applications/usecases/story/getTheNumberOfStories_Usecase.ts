export const getTheNumberOfStories_Usecase = (dependencies: any) => {
    const { repository: {storyRepository} } = dependencies;
    const executeFunction = async () => {    
      
      const response=await storyRepository.getTheNumberOfStories()
      if (response) {
          return { status: response.status, message: response.message, data: response.data };
        }
        return { status: false, message: "db crashed" };
    };
    return { executeFunction };
  };
  