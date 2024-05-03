import { Request, Response } from "express";
import { decodeDataFromHeaders } from "../../../Utils/Jwt/decodeUserDataFromHeaders";

export default (dependencies: any) => {
  console.log("EnTer");  

  const {
    useCase: { chooseInterest_Usecase },
  } = dependencies;
  const ChooseInterestController = async (req: Request, res: Response) => {
    
    const userId = await decodeDataFromHeaders(req.headers)    
    console.log(userId,"userIduserIduserId");
    
      if(userId){
     const response = await chooseInterest_Usecase(dependencies).executeFunction(req.body,userId);
     if(response){
       res.json({status:response.status , message:response.message})
     }
   }else{
    res.json({status:userId.status , message:userId.message})
   }
    const email: string = "ableksaju3@gmail.com"; // req.session.userData.email
  };
  return ChooseInterestController;
};
