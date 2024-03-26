import { Request, Response } from "express"


export default (dependecies:any)=>{

    const {getUsersDataById_Usecase}=dependecies.useCase
    const getUserByIdController=async (req:Request,res:Response)=>{
        const ids=req.body.ids
        console.log(ids,"idsidsidsids");
        const response=await getUsersDataById_Usecase(dependecies).executeFunction(ids)        
        if(response.status){
            res.status(200).json({status:true,data:response.data})
        }else{
            res.status(400).json({status:false})
        }
    }
    return getUserByIdController
} 