import { Request, Response } from "express";
import {  decodeDataFromHeaders } from "../../../Utils/Jwt";

export default (dependencies:any)=>{
    const {useCase:{getMyAllStoriesForHighlight_Usecase}}=dependencies
    const GetMyAllStoriesForHighLighController=async(req:Request,res:Response)=>{
      const userId = await decodeDataFromHeaders(req.headers)    
      if(userId){
        const response=await getMyAllStoriesForHighlight_Usecase(dependencies).executeFunction(userId)
        console.log(response,"response by cont");
        
        if(response){
            res.json({status:response.status , message:response.message , data:response.data})
          } else {
            res.json({status:false , message:"response not found ", data:false})
          }
        }
    }
    return GetMyAllStoriesForHighLighController
}