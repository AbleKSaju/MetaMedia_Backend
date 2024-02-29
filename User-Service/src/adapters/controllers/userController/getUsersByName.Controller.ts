import { Request, Response } from "express"


export default (dependecies:any)=>{

    const {getUsersByName_Usecase}=dependecies.useCase
    const getUsersByNameController=async (req:Request,res:Response)=>{
        
console.log('hiiiiii',req.body);

const name:string=req.body.name
       const responce =await getUsersByName_Usecase(dependecies).executeFunction(name)
        if(responce.status){
            res.status(200).json({status:true,data:responce.data})
        }else{
            res.status(200).json({status:false})
        }
    }
    return getUsersByNameController
} 