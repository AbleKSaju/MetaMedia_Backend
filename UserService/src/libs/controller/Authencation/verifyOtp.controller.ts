import { Request, Response } from "express";
import { authenticationRepository } from "../../app/repository";
import { hashPassword } from "../../../helper";
import {createAccessToken,createRefreshToken} from '../../../utils/jwt'
export default (dependencies:any) => {
    const {
        useCase:{verifyOtp_Usecase}
    }=dependencies

  const verifyOtpController = async (req: Request, res: Response) => {
    const { otp } = req.body;
    if (otp) {      
      if (otp == req.session.Otp) {        
        const data=req.session.userData        
        const hashedPassword=await hashPassword(data.password)        
        data.password=hashedPassword
        console.log(data,"DATA");
        
        const userData=await verifyOtp_Usecase(dependencies).executeFunction(data)        
        if(userData.status){
          console.log('USER VERIFIED SUCESSS',userData);



          
          
            res.status(201).json(userData.addUserData.message);
        }else{
            res.status(400).json({message:"UserData error"})
        }
      } else {
        res.status(400).json({message:"Wrong otp"})
      }
    }else{
        res.status(404).json({message:"Otp not found"})
    }
  };
  return verifyOtpController;
};
