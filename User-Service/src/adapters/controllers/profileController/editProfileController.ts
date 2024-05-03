import { Request, Response } from "express";
import { decodeDataFromHeaders } from "../../../Utils/Jwt/decodeUserDataFromHeaders";

export default (dependencies:any)=>{
    const {useCase:{editUserUsecase}}=dependencies
    const EditProfileController = async(req:Request,res:Response)=>{
      console.log("EditProfileController");
      const userId = await decodeDataFromHeaders(req.headers)    
      if(userId){
            const response = await editUserUsecase(dependencies).executeFunction(req.body,userId);
            if (response) {
              res.json({ status: response.status, message: response.message, user:response.user });
            }
          } else {
            res.json({ status: userId.status, message: userId.message });
          }        

    }
    return EditProfileController
} 