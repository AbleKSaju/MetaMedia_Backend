export const CommentNotification_usecase = (dependencies: any) => {
    const { repository: { NotifaicationRepo } } = dependencies;
  
    const executeFunction = async (data:any) => {
      
        
        const response = await NotifaicationRepo.commentNotification(data);
        if (response.status) {
          return { status: response.status, data:response.data };
        }else{
        return { status: false, message: response.message };
      }
    };
    return { executeFunction };
  };