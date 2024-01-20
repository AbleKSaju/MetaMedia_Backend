import { Request, Response } from "express";
import { authenticationRepository } from "../../app/repository";
import { hashPassword } from "../../../helper";

export default () => {
  const verifyOtpController = async (req: Request, res: Response) => {
    const { otp } = req.body;
    if (otp) {
      if (otp === req.session.Otp) {
        const data=req.session.userData
        const hashedPassword=await hashPassword(data.password)
        data.password=hashedPassword
        const userData=await authenticationRepository.createUser(data)
        if(userData.status){
            res.status(201).json(userData.message);
        }else{
            res.status(400).json({message:"UserData error"})
        }    
        res.status(201).json({ message: "Otp is Correct" });
      } else {
        res.status(400).json({message:"Wrong otp"})
      }
    }else{
        res.status(404).json({message:"Otp not found"})
    }
  };
  return verifyOtpController;
};
