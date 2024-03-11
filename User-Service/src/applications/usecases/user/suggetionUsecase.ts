export const Suggetion_Usecase = (dependencies: any) => {
    const { suggetionRepo} = dependencies.repository;
  
    const executeFunction = async (userId: any) => {
       
     const response=await suggetionRepo.suggestion(userId)
      
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
  