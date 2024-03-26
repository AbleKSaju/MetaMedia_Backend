export const subscribeToAwsSNS_useCase = (dependecies: any) => {
   
    
    const {repository: { userRepository }} = dependecies;
    const executeFunction = async (data:any) => {
  
      const response = await userRepository.subscribeSNS(data)
      if (response.status) {
        return { status: response.status, data:response.data };
      }
      return { status: false, message: response.message };
    };
    return { executeFunction };
  };
  