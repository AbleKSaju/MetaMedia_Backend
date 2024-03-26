
export const genarateVapidKeys_useCase = (dependecies: any) => {
   
    
  const {repository: { userRepository }} = dependecies;
  const executeFunction = async (data:any) => {

    const response = await userRepository.generateVAPIDKeysForUser(data)
    if (response.status) {
      return { status: response.status, data:response.data };
    }
    return { status: false, message: response.message };
  };
  return { executeFunction };
};
