import { userProducer } from "../../../events/userproducer";
import { uploadImageToS3 } from "../../../utils/S3/s3UploadImage";

export const loginWithFacebook_Usecase=(dependencies:any)=>{
    const {repository: { authenticationRepository }} = dependencies;

    const executeFunction = async(data:any)=>{        
        const {email} = data;        
        console.log("Email",email);
        const response = await authenticationRepository.finduser(email);
        console.log(response,"RESSS");
        
        if (response.status == true) {
            console.log(response.user,"userr");
            
            if (response.user.basicInformation.isFacebook == true) {
              const { user } = response;
              console.log(user,"USER");
                //create acces token and refresh toekn here
              return { status: true, message: "Login success", user:user };
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
                console.log(status,"stat");
                
                const res = await userProducer(createUser.response, "auth", "add-user");
                return {status:true , message:"Signup success", user:createUser.response}
            } else {
                return {status:false , message:"Signup failed"}
            }
    }
}
    return {executeFunction}


}