import { createAccessToken, createRefreshToken } from "../../../utils/jwt";

export const verifyOtp_Usecase = (dependencies: any) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;
  const executeFunction = async (data: any) => {
    const user = await authenticationRepository.createUser(data);

    if (user.status) {
      
      //create acces and refresh token
      const accesstoken=createAccessToken(user,process.env.ACCESS_SECRET_KEY!,process.env.ACCESS_EXPIRY!)
      const refreshtoken=createRefreshToken(user,process.env.REFRESH_SECRET_KEY!,process.env.REFRESH_EXPIRY!)
      return { status:true , accesstoken:accesstoken, refreshtoken:refreshtoken,user:user.response,message:"otp verified" }
    } else {
      return { status: false };
    }
  };
  return {
    executeFunction,
  };
};
