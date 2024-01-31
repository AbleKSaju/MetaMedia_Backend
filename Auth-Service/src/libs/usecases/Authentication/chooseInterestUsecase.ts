export const chooseInterest_Usecase = (dependecies: any) => {
    console.log("I am chooseInterest_Usecase" );
    
  const {
    repository: { authenticationRepository }
  } = dependecies;
  const executeFunction = async (data: any, email: string) => {
    console.log(data, "Data from usecase");

    const response = await authenticationRepository.createInterest(data, email);
    if (response) {
      return { status: response.status, message: response.message };
    }
    return { status: false, message: "db crashed" };
  };
  return { executeFunction };
};