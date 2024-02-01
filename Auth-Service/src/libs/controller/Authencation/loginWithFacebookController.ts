import { Request, Response } from "express";
import dependencies from "../../../config/dependencies";

export default (dependencies: any) => {
  const { useCase: { loginWithFacebook_Usecase }} = dependencies;
  const loginWithFaceBook = async (req: Request, res: Response) => {
    const {profile, email, name, isGoogle, isFacebook} = req.body;
    const data = { profile, email, password: "", name, isGoogle, isFacebook };
    const response = await loginWithFacebook_Usecase(dependencies).executeFunction(data);
    if (response.status) {
     
      const {accesstoken,refreshtoken,user,message}=response
      const userWithOutpassword={
        _id:user._id,
        name:user.basicInformation.fullName,
        email:user.basicInformation.email,
        isGoogle:user.basicInformation.isGoogle,
        isFacebook:user.basicInformation.isFacebook,
        profile:user.profile.profileUrl || '',
        interest:user.profile.interests || []
      }
      req.session.refreshToken=refreshtoken
      const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      res.cookie('accessToken',accesstoken,{
       expires:expirationDate,
       httpOnly:true,
       secure:true
      })

     res.status(201).json({status:true,accesstoken:accesstoken,user:userWithOutpassword,message:message})
      
      // res.json({status: true,message: response.message,data: response.user});
    } else {
      res.json({ status: response.status, message: response.message });
    }
  };
  return loginWithFaceBook;
};
