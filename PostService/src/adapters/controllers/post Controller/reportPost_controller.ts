import { Request,Response } from "express"
const { check, validationResult } = require('express-validator');
export default (dependencies:any)=>{
    const reportPostController=async(req:Request,res:Response)=>{

        const {reportPost_UseCase}=dependencies.useCase
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.json({status:false, message:"validation error", errors: errors.array() });
        }
        const {userId,content,postId}=req.body
        const data={
            userId,
            content,
            postId
        }

        const responce=await reportPost_UseCase(dependencies).executeFunction(data)

        if(responce.status){
          return   res.status(200).json({status:true,data:responce.data})
        }else{
          return  res.status(400).json({status:false,message:responce.message})
        }

    }
    return reportPostController
}