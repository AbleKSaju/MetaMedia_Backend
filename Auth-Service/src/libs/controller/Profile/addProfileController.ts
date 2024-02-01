import { Request, Response } from "express";
import { decodeRefreshToken } from "../../../utils/jwt/jwt";

export default (dependencies: any) => {
  console.log("ENTER");

  const {
    useCase: { addProfile_Usecase },
  } = dependencies;

  const AddProfileController = async (req: Request, res: Response) => {
    console.log(req.body, "Body");

    let userData:any=await decodeRefreshToken(req.session.refreshToken)   
    if(userData.status){
    const userId=userData?.data?.user?._id || userData?.data?.user?.response._id 
     const response = await addProfile_Usecase(dependencies).executeFunction(req.body,userId);
     if(response){
        res.json({status:response.status , message:response.message})
      }
    }else{
     res.json({status:userData.status , message:userData.message})
    }
  };
  return AddProfileController;
};