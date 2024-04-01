export const FollowNotification_usecase = (dependencies: any) => {
  console.log('j-------------------------');
  
    const { repository: { NotifaicationRepo } } = dependencies;
  
    const executeFunction = async (data:any) => {
      
        console.log('HIIHIHIHIHIHIH------');
        
        const response = await NotifaicationRepo.followNotification(data);
        if (response.status) {
          return { status: response.status, data:response.data };
        }else{
        return { status: false, message: response.message };
      }
    };
    return { executeFunction };
  };