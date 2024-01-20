import { Request,Response } from "express";

export default (dependencies:any)=>{
    const {
        useCase:{createUser_Usecases}
    }=dependencies

    const createUserController=async(req:Request,res:Response)=>{
         const response=await createUser_Usecases(dependencies).executeFunction(req.body)
         const {data,otp}=response
        req.session.userData=data
        req.session.Otp=otp
        res.status(201).json({message:"Otp sent success"})
    }

    return createUserController
}