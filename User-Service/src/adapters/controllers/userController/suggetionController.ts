import { Request, Response } from "express"


export default (dependecies:any)=>{

    const {Suggetion_Usecase}=dependecies.useCase
    const savePostController=async (req:Request,res:Response)=>{
        const {userId}=req.query
        const response=await Suggetion_Usecase(dependecies).executeFunction(userId)
        if(response.status){
            res.status(200).json({status:true,data:response.data})
        }else{
            res.status(400).json({status:false,message:response.message})
        }
    }
    return savePostController
} 