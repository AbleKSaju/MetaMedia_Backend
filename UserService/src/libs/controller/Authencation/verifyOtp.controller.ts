import { Request, Response } from "express";
import { authenticationRepository } from "../../app/repository";
import { hashPassword } from "../../../helper";
import {createAccessToken,createRefreshToken} from '../../../utils/jwt'
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
            res.status(201).json({status:true , message:response.message});
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
