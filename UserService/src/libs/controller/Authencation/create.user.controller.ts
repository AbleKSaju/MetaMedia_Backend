import { Request,Response } from "express";

export default (dependencies:any)=>{
    const {
        useCase:{createUser_Usecases}
    }=dependencies

    const createUserController=async(req:Request,res:Response)=>{
         const responce=await createUser_Usecases(dependencies).executeFunction(req.body)
         console.log('responce from createUser_Usecases ',responce)
         res.status(201).json(responce)
    }

    return createUserController
}