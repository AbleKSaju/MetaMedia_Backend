import { Request, Response } from "express";

export default () => {
  const verifyOtpController = async (req: Request, res: Response) => {
    const { otp } = req.body;
    if (otp) {
      if (otp === req.session.Otp) {
        
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
