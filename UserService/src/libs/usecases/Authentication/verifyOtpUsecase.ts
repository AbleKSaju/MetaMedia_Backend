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
      console.log(accesstoken,"access token",refreshtoken,"refershToken");
      //save data to the auth service
      // const res = await userProducer(addUserData.response, "auth", "add-user");
      
const url = "http://localhost:3001/api/v1/authsetting";
const data = {
  refreshToken:refreshtoken,
  userData:addUserData.response
};
return fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((responseData) => {
    console.log(responseData, "responseData");
    return {status:true}
  })
  .catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
  });
    
 
      
    } else {
      return { status: false };
    }
  };
  return {
    executeFunction,
  };
};
