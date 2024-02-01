import { Request, Response } from "express";

import { hashPassword } from "../../../helper";

import { validationResult } from "express-validator";

export default (dependencies:any) => {
    const {
        useCase:{verifyOtp_Usecase}
    }=dependencies

  const verifyOtpController = async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const { otp } = req.body;
    if (otp) {      
      if (otp == req.session.Otp) {        
        const data=req.session.userData        
        const hashedPassword=await hashPassword(data.password)        
        data.password=hashedPassword
        const response=await verifyOtp_Usecase(dependencies).executeFunction(data)        
        if(response.status){      
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
        }else{
            res.status(400).json({status:false , message:"UserData error"})
        }
      } else {
        res.status(400).json({status:false , message:"Wrong otp"})
      }
    }else{
        res.status(404).json({status:false , message:"Otp not found"})
    }
  };
  return verifyOtpController;
};
