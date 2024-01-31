
import { Request, Response } from "express";
import { createAccessToken } from "../../../utils/jwt";

export default (dependencies: any) => {
    const { useCase: { loginWithGoogle_Usecase }} = dependencies;
  const loginWithGoogle = async (req: Request, res: Response) => {
    const { profile, email, name, isGoogle, isFacebook } = req.body;
    const data = {profile,email,password: "",name,isGoogle,isFacebook};
    const loginreff= await loginWithGoogle_Usecase(dependencies)
    const {executeFunction}=loginreff
    const response=await executeFunction(data)
    // const login = await loginWithGoogle_Usecase(dependencies)
    // const response = login.executeFunction(data)
    console.log(response,"resss");
    
    if (response.status) {
        res.json({status: true,message: response.message,data:response.user});
      } else {
        res.json({ status: response.status, message: response.message });
      }
  };

  return loginWithGoogle;
};

