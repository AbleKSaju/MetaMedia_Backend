export const SavePost_Usecase = (dependencies: any) => {
    const { repository: { userRepository } } = dependencies;
  
    const executeFunction = async (data: any) => {
       
      const response=await userRepository.savePost(data)
      
      if (response.status) {
        return { status: true , data: response.data };
      } else {
        return { status: false , message:response.message};
      }
    };
    return {
      executeFunction,
    };
  };
  