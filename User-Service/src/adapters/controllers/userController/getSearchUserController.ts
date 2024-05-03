import { NextFunction, Request, Response } from "express";
import { decodeDataFromHeaders } from "../../../Utils/Jwt/decodeUserDataFromHeaders";

export default (dependecies: any) => {
  const { getSearchUser_Usecase } = dependecies.useCase;
  const getSearchUserController = async (req: Request, res: Response, next:NextFunction) => {  
    try {
      const {user} = req.params
      const userId = await decodeDataFromHeaders(req.headers)    
      if(userId){
      const response = await getSearchUser_Usecase(dependecies).executeFunction(user,userId);
      console.log(response,"responceresponce");
      if (response.status) {
        res.status(200).json({ status: true, data: response.data });
      } else {
        res.status(400).json({ status: false });
      }
    }else{
      res.status(400).json({ status: false, message:"User not found" });
    } 
    } catch (error) {
      console.log(error,"EEEEEE");
      next(error)
    }
  };
  return getSearchUserController;
};