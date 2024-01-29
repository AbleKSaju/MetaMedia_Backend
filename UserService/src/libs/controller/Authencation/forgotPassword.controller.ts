import { Request, Response } from "express"


export default (dependecies:any)=>{
    const {useCase:{verifyEmail_Usecases}}=dependecies
    const forgotPasswordController=async (req:Request,res:Response)=>{
        const {email}=req.body
        const response =await verifyEmail_Usecases(dependecies).executeFunction(email)        
        if(response){
            res.json({status:response?.status , message:response?.message})
         }else{            
            res.json({status:false , message:"Internal error"})
         }
    }
    return forgotPasswordController
} 