import { userProducer } from "../../../events/userproducer";
import { uploadImageToS3 } from "../../../utils/S3/s3UploadImage";
import { UserData } from "../../../utils/interfaces/userInterface";

export const loginWithGoogle_Usecase = async (dependencies: any) => {
  const { repository: { authenticationRepository }} = dependencies;
  const executeFunction = async (data: UserData) => {
    const { email } = data;
    const response = await authenticationRepository.finduser(email);

    //user already exist
    if (response.status == true) {
      console.log(response, "userr");
      //user is exist
      if (response.isGoogle == true) {
        //this user cretaed with gooogle aleady
        //login the user
        const { user } = response;
        console.log(user, "HHHHHHH");

        //create acces token and refresh toekn here

        return { status: true, message: "Login success", user: user };
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
      console.log(createUser,"uuuu");
      
      //and send to user service
      const { status } = createUser;
      if (status) {
        console.log(status, "stat");
        //produce a message to the auth service and save that
        //create refresh token and acces token
        const res = await userProducer(createUser.response, "auth", "add-user");

        return {
          status: true,
          message: "Signup success",
          user: createUser.response,
        };
      } else {
        return { status: false, message: "Signup failed" };
      }
    }
  };

  return { executeFunction };
};
