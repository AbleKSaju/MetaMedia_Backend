import { userProducer } from "../../../events/userproducer";
import { createAccessToken, createRefreshToken } from "../../../utils/jwt";

export const verifyOtp_Usecase = (dependencies: any) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;
  const executeFunction = async (data: any) => {
    const addUserData = await authenticationRepository.createUser(data);

    // if (addUserData.status) {
    //   //create acces and refresh token
    //   const accesstoken=createAccessToken(addUserData,process.env.ACCESS_SECRET_KEY!,process.env.ACCESS_EXPIRY!)
    //   const refreshtoken=createRefreshToken(addUserData,process.env.REFRESH_SECRET_KEY!,process.env.REFRESH_EXPIRY!)


      //save data to the auth service
      const res = await userProducer(addUserData.response, "auth", "add-user");

      if (res) {
        return { status: true, message:"User verified", data:addUserData };
      } else {
        return { status: false , message:"Auth Service down"};
      }
    // } else {
    //   return { status: false, message:"user not created"};
    // }
  };
  return {
    executeFunction,
  };
};
