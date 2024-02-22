import { verifyPassword } from "../../../utils";

export const createUserUsecase = (dependencies: any) => {
    console.log("55createUserUsecase");
    
  const {repository: { userRepository }} = dependencies;
  const executeFunction = async (data: any) => {
    console.log("ENTER TO EECUTER");
    
    const response = await userRepository.createUser(data);
       console.log(response,"ressp");
                                               
    if (!response.status) {
      return { message: "Email is not valid", status: false };
    } else {
      return { message: "User craeted", status: true };
    }

  };

  return { executeFunction };
};
