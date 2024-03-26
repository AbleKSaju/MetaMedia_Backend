export const MessageNotification_usecase = (dependencies: any) => {
    const { repository: { NotifaicationRepo } } = dependencies;
  
    const executeFunction = async (data:any) => {
      
        
        const response = await NotifaicationRepo.messageNotification(data);
        if (response.status) {
          return { status: response.status, data:response.data };
        }else{
        return { status: false, message: response.message };
      }
    };
    return { executeFunction };
  };