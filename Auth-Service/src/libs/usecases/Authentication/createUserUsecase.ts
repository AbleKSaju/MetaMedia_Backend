import { sentOtp } from "../../../helper";

interface UserData {
  name: string;
  email: string;
  profile:string;
  password: string;
  isGoogle:boolean,
  isFacebook:boolean
}

export const createUser_Usecases = (dependencies: any) => {
  const { repository: { authenticationRepository }} = dependencies;

  const executeFunction = async (data: UserData) => {    
  
    const UserExist = await authenticationRepository?.userEmailExist( data?.email );
    
    if (UserExist) {
      return { status: false, message: "User already exist" };
    }
    const response = await sentOtp(data?.email);
    if (response?.status) {
      const { otp } = response;
      return { status: true, data, otp:otp };
    } else {
      return { status: response?.status, message: response?.message };
    }
  };
  return {
    executeFunction,
  }
};
