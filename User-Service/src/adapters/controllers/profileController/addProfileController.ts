import { Request, Response } from "express";
import { decodeDataFromHeaders } from "../../../Utils/Jwt/decodeUserDataFromHeaders";

export default (dependencies: any) => {
  const {
    useCase: { addProfileUsecase },
  } = dependencies;

  const AddProfileController = async (req: Request, res: Response) => {
    console.log("AddProfileController");
        const userId = await decodeDataFromHeaders(req.headers)    
    if(userId){
      const response = await addProfileUsecase(dependencies).executeFunction(
        req.body,
        userId
      );
      console.log(response,"response from controller");
      
      if (response) {
        console.log(response.user,"USERDdd");
        const data={
          // name:response.user.basicInformation.fullName,
          // _id:response.user.basicInformation.userId,
          // email:response.user.basicInformation.email,
          // isGoogle:response.user.basicInformation.isGoogle,
          // isFacebook:response.user.basicInformation.isFacebook,
          dateOfBirth:response.user.basicInformation.dateOfBirth,
          gender:response.user.basicInformation.gender,
          phoneNumber:response.user.basicInformation.phoneNumber,
          userName:response.user.basicInformation.userName,
          interests:response.user.profile.interests,
          profile:response.user.profile.profileUrl || "",
          bio:response.user.profile.bio,
        }
        
        res.json({ status: response.status, message: response.message , user:data });
      }
    } else {
      res.json({ status: false, message: "user Not found" });
    }
  };
  return AddProfileController;
};
