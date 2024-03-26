import { Request, Response } from "express";
import { sentOtp } from "../../../helper";

export default (dependencies: any) => {

  const resendOtpController = async (req:any, res: Response) => {
    const {email} =req.body
    console.log(email,"emailemail");
    
    if(!email) return res.json({ status: false, message: "Email not found"});
    const response = await sentOtp(email)
    if (response.status) {
      const { otp } = response;
      console.log(otp,"Newotp");
      req.session.Otp = otp;
      res.json({ status: response?.status, message:"Resent Success"});
    }else{
        res.json({ status: response?.status, message: response?.message });
    }
  };

  return resendOtpController;
};
