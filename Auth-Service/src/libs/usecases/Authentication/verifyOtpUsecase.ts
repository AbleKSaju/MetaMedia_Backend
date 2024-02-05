import { userProducer } from "../../../events/userproducer";
import { createAccessToken, createRefreshToken } from "../../../utils/jwt";

export const verifyOtp_Usecase = (dependencies: any) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;
  const executeFunction = async (data: any) => {
    const addUserData = await authenticationRepository.createUser(data);
    if (addUserData.status) {
      
      //create acces and refresh token
      const accesstoken=createAccessToken(addUserData,process.env.ACCESS_SECRET_KEY!,process.env.ACCESS_EXPIRY!)
      const refreshtoken=createRefreshToken(addUserData,process.env.REFRESH_SECRET_KEY!,process.env.REFRESH_EXPIRY!)
      return { status:true , accesstoken:accesstoken, refreshtoken:refreshtoken,user:addUserData.response,message:"otp verified" }
    } else {
      return { status: false };
    }
  };
  return {
    executeFunction,
  };
};
