
export const getAllStories_Usecase = (dependencies: any) => {
    const { repository: {storyRepository} } = dependencies;
    const executeFunction = async (userId:string) => {              
      const response=await storyRepository.getAllStories(userId)
      if (response) {
          return { status: response.status, message: response.message, data: response.data };
        }
        return { status: false, message: "db crashed" };
    };
    return { executeFunction };
  };
  