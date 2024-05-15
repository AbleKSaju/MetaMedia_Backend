export const chooseInterest_Usecase = (dependecies: any) => {    
  const {
    repository: { authenticationRepository }
  } = dependecies;
  const executeFunction = async (data: any, userId: string) => {
    const response = await authenticationRepository.createInterest(data, userId);
    if (response) {
      return { status: response.status, message: response.message };
    }
    return { status: false, message: "db crashed" };
  };
  return { executeFunction };
};
