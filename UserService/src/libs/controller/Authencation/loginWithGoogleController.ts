import {Request,Response} from 'express'
import { createAccessToken } from '../../../utils/jwt';

export default (dependencies:any)=>{

    

    const loginWithGoogle=async(req:Request,res:Response)=>{
        const { useCase:{loginWithGoogle_Usecase} }=dependencies

        const {profile,email,name,isGoogle,isFacebook}=req.body
        const data={
            profile,
            email,
            password:"",
            name,
            isGoogle,
            isFacebook
        }

        const loginreff= await loginWithGoogle_Usecase(dependencies)
        const {executeFunction}=loginreff
        const responce=await executeFunction(data)
     
     if(responce.status){
        if(responce.message=='login'){
           //send userdata ,accestoken
            return  res.json({status:true,responce,message:"sucesss..!"})
        }

        return  res.json({status:false,message:"the user is not able to login "})
     }else{
        return res.json({status:false,message:responce.message})
     }


    }

    return loginWithGoogle


}