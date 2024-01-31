import { userProducer } from "../../../events/userproducer";
import { uploadImageToS3 } from "../../../utils/S3/s3UploadImage";
import { UserData } from "../../../utils/interfaces/userInterface";
import { createAccessToken, createRefreshToken } from "../../../utils/jwt";

export const loginWithGoogle_Usecase = async (dependencies: any) => {
  const { repository: { authenticationRepository }} = dependencies;
  const executeFunction = async (data: UserData) => {
    const { email } = data;
    const response = await authenticationRepository.finduser(email);

    //user already exist
    if (response.status == true) {
      
      //user is exist
      if (response?.user?.basicInformation?.isGoogle == true) {
        //this user cretaed with gooogle aleady
        //login the user
        const { user } = response;
       

        //create acces token and refresh toekn here
        const accesstoken=createAccessToken(user,process.env.ACCESS_SECRET_KEY!,process.env.ACCESS_EXPIRY!)
        const refreshtoken=createRefreshToken(user,process.env.REFRESH_SECRET_KEY!,process.env.REFRESH_EXPIRY!)
        return { status:true , accesstoken:accesstoken, refreshtoken:refreshtoken,user:user,message:"user logined" }

       
      } else {
        return { status: false, message: "user is already exist" };
      }
    } else {
      const { profile, email, name, isGoogle, isFacebook } = data;
      const imageName = `${email}_${Date.now()}.jpg`;
      const s3ImageUrl = await uploadImageToS3(profile, imageName);
      const datas = {
        email,
        name,
        profile: s3ImageUrl,
        password: "",
        isGoogle,
        isFacebook,
      };
      const createUser = await authenticationRepository.createUser(datas);
     
      
      //and send to user service
      const { status } = createUser;
      if (status) {
       
        //produce a message to the auth service and save that
        //create refresh token and acces token
        const accesstoken=createAccessToken(createUser.response,process.env.ACCESS_SECRET_KEY!,process.env.ACCESS_EXPIRY!)
        const refreshtoken=createRefreshToken(createUser.response,process.env.REFRESH_SECRET_KEY!,process.env.REFRESH_EXPIRY!)
        return { status:true , accesstoken:accesstoken, refreshtoken:refreshtoken,user:createUser.response,message:"user logined" }

      } else {
        return { status: false, message: "Signup failed" };
      }
    }
  };

  return { executeFunction };
};
