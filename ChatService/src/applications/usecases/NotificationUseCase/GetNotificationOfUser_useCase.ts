export const GetNotificationOfUser_useCase = (dependencies: any) => {
    const { repository: { NotifaicationRepo } } = dependencies;
  
    const executeFunction = async (userId:any) => {
      
        
        const response = await NotifaicationRepo.getNotificationOfUser(userId);
        if (response.status) {
          return { status: response.status, data:response.data };
        }else{
        return { status: false, message: response.message };
      }
    };
    return { executeFunction };
  };