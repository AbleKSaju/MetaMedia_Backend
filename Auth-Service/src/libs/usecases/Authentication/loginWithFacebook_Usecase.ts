import { userProducer } from "../../../events/userproducer";
import { uploadImageToS3 } from "../../../utils/S3/s3UploadImage";
import { createAccessToken, createRefreshToken } from "../../../utils/jwt";

export const loginWithFacebook_Usecase=(dependencies:any)=>{
    const {repository: { authenticationRepository }} = dependencies;

    const executeFunction = async(data:any)=>{        
        const {email} = data;
        const response = await authenticationRepository.finduser(email);
        
        if (response.status == true) {
             
            if (response.user.basicInformation.isFacebook == true) {
              const { user } = response;
                //create acces token and refresh toekn here
                const accesstoken=createAccessToken(user,process.env.ACCESS_SECRET_KEY!,process.env.ACCESS_EXPIRY!)
                const refreshtoken=createRefreshToken(user,process.env.REFRESH_SECRET_KEY!,process.env.REFRESH_EXPIRY!)
                return { status:true , accesstoken:accesstoken, refreshtoken:refreshtoken,user:user,message:"user logined" }
            } else {
              return { status: false, message: "user is already exist" };
            }
          }  else {
            const { profile, email, name, isGoogle, isFacebook } = data;
            const imageName = `${email}_${Date.now()}.jpg`;
            const s3ImageUrl = await uploadImageToS3(profile, imageName);
            const datas = {
                email,
                name,
                profile: s3ImageUrl,
                password:'',
                isGoogle,
                isFacebook,
              };
            const createUser = await authenticationRepository.createUser(datas);
            const { status } = createUser
            if (status) {
             
                
                const accesstoken=createAccessToken(createUser.response,process.env.ACCESS_SECRET_KEY!,process.env.ACCESS_EXPIRY!)
        const refreshtoken=createRefreshToken(createUser.response,process.env.REFRESH_SECRET_KEY!,process.env.REFRESH_EXPIRY!)
        return { status:true , accesstoken:accesstoken, refreshtoken:refreshtoken,user:createUser.response,message:"user logined" }
            } else {
                return {status:false , message:"Signup failed"}
            }
    }
}
    return {executeFunction}


}