export const chooseInterest_Usecase = (dependecies: any) => {
    console.log("I am chooseInterest_Usecase" );
    
  const {
    repository: { authenticationRepository }
  } = dependecies;
  const executeFunction = async (data: any, userId: string) => {
    console.log(data, "Data from usecase");
    console.log(userId, "Data from usecase");

    const response = await authenticationRepository.createInterest(data, userId);
    console.log(response,"RESSSS");
    if (response) {
      return { status: response.status, message: response.message };
    }
    return { status: false, message: "db crashed" };
  };
  return { executeFunction };
};
