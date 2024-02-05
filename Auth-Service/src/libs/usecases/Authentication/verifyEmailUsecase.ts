import { sentOtp } from "../../../helper";

export const verifyEmail_Usecases = (dependecies: any) => {
  const {
    repository: { authenticationRepository },
  } = dependecies;
  const executeFunction = async (email: string) => {
    const response = await authenticationRepository.userEmailExist(email);
    if (response?.basicInformation?.isGoogle) {
      return { status: false, message: "You signed with google" };
    } else if (response?.basicInformation?.isFacebook) {
      return { status: false, message: "You signed with facebook" };
    } else if (response) {
      console.log(response,"RES");
      
      return { status: true, message: "Email verified" };
    } else {
      return { status: false, message: "user not exist" };
    }
  };
  return { executeFunction };
};