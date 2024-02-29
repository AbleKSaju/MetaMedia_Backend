import { Request, Response } from "express"


export default (dependecies:any)=>{

    const {getUsersById_Usecase}=dependecies.useCase
    const getUserByIdController=async (req:Request,res:Response)=>{
        const id=req.body.id
        const responce=await getUsersById_Usecase(dependecies).executeFunction(id)
        if(responce.status){
            res.status(200).json({status:true,data:responce.data})
        }else{
            res.status(400).json({status:false})
        }
    }
    return getUserByIdController
} 