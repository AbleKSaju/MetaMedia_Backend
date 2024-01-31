import {Request,Response} from 'express'
import { createAccessTocken } from '../../../utils';

export default (dependencies:any)=>{

    

    const loginWithGoogle=async(req:Request,res:Response)=>{
        const {
            
            useCase:{loginWithGoogle_Usecase}
        
        }=dependencies
        console.log(req.body,"this is req.body");

        const {profile,email,name,isGoogle,isFacebook}=req.body
        const data={
            profile,
            email,
            name,
            isGoogle,
            isFacebook
        }

        const loginreff= await loginWithGoogle_Usecase(dependencies)
        const {executeFunction}=loginreff
        const responce=await executeFunction(data)



        console.log(responce);
     if(responce.status){
        if(responce.message=='login'){
            //login the user 
            const token = await createAccessTocken(email,name)
            res.cookie('user', token, {
                httpOnly: true,
                secure:true ,
                signed: true,
                maxAge:24 * 60 * 60 * 1000
            })
            res.json({status:true,token,responce})
        }

         res.json({message:"succes"})
     }else{
        res.json({message:responce.message})
     }


    }

    return loginWithGoogle


}