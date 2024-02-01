import { Request, Response } from "express"

export default (dependencies:any)=>{
    const {useCase:{addProfile_Usecase}}=dependencies


    const AddProfileController=async(req:Request,res:Response)=>{
        console.log(req.body,"Body");
        

        const response = await addProfile_Usecase(dependencies).executeFunction(req.body)
        if(response){
            console.log(response,"RES FROM CONTROLLER");
            
        }
    }
    return AddProfileController
}