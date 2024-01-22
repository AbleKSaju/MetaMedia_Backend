import { verifyHashPassword } from "../../../helper";

export const verifyPassword_Usecase = async (dependencies: any)=> {    
  const {
    repository: { authenticationRepository },
  } = dependencies;
const executeFunction=async(email: string, password: string)=> {    
    const userData = await authenticationRepository.userEmailExist(email);
    if (userData) {      
      let verified = await verifyHashPassword(password, userData.password);
      if (verified) {
        return { status: true, message: "Otp is Correct" };
      }
      return { status: false, message: "Otp is wrong" };
    } else {
      return { status: false, message: "User not exist" };
    }
  };
  return { executeFunction };
};