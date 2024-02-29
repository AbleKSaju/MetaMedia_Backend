import { Request, Response } from "express"


export default (dependecies:any)=>{

    const {getUsersDataById_Usecase}=dependecies.useCase
    const getUserByIdController=async (req:Request,res:Response)=>{
        console.log(req.body,"req.bodyreq.body");
        const ids=req.body.ids
        const response=await getUsersDataById_Usecase(dependecies).executeFunction(ids)
        console.log(response,"response form getUserByIdController");
        
        if(response.status){
            res.status(200).json({status:true,data:response.data})
        }else{
            res.status(400).json({status:false})
        }
    }
    return getUserByIdController
} 