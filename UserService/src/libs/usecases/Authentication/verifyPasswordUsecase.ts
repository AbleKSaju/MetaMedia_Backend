import { verifyHashPassword } from "../../../helper";

export const verifyPassword_Usecase = async (dependencies: any)=> {
    console.log("Enter to vaidate");
    
  const {
    repository: { authenticationRepository },
  } = dependencies;
const executeFunction=async(email: string, password: string)=> {
    console.log("Enter to execute");
    
    const userData = await authenticationRepository.userEmailExist(email);
    if (userData) {
      let verified = await verifyHashPassword(password, userData.password);
      if (verified) {
        return { status: true, message: "password is Correct" };
      }
      return { status: false, message: "password is wrong" };
    } else {
      return { status: false, message: "User not exist" };
    }
  };
  return { executeFunction };
};