import {Request,Response} from 'express'


export default (dependencies:any)=>{    
    const {useCase:{verifyPassword_Usecase}}=dependencies
    const verifyPasswordController=async(req:Request,res:Response)=>{
        const email:string=req.session.userData.email
        const password:string=req.body.password
       
        const {executeFunction}=await verifyPassword_Usecase(dependencies)
        let responce=await executeFunction(email,password)
        if(responce.status){
            res.status(200).json({message:responce.message})
        }else{
            res.status(404).json({message:responce.message})
        }
    }
    return verifyPasswordController
}