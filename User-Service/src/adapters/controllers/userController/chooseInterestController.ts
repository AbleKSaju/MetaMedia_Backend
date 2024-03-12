import { Request, Response } from "express";
import { decodeAccessToken } from "../../../utils/jwt";

export default (dependencies: any) => {
  console.log("EnTer");  

  const {
    useCase: { chooseInterest_Usecase },
  } = dependencies;
  const ChooseInterestController = async (req: Request, res: Response) => {
    
    const {accessToken} = req.cookies;
   let userData:any=await decodeAccessToken(accessToken)  
    
   if(userData.status){
    const userId=userData?.data?.user?._id || userData?.data?.user?.response._id 
     const response = await chooseInterest_Usecase(dependencies).executeFunction(req.body,userId);
     if(response){
       res.json({status:response.status , message:response.message})
     }
   }else{
    res.json({status:userData.status , message:userData.message})
   }
    const email: string = "ableksaju3@gmail.com"; // req.session.userData.email
  };
  return ChooseInterestController;
};
