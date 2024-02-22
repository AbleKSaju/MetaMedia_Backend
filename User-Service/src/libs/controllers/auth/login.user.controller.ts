const { check, validationResult } = require('express-validator');
import {createAccessTocken} from '../../../utils/index'
import {Request,Response} from 'express'
export default (dependencies:any)=>{
    const {useCase:{loginUser_usecases}}=dependencies

const loginusercontroller=async(req:Request,res:Response)=>{
  const {
    useCase:{loginUser_usecases}
  }=dependencies
   
    const {email,password}=req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({message:"validation error", errors: errors.array() });
    }
    //user
    const responce=await loginUser_usecases(dependencies).executeFunction(email,password)
    console.log('hellloo');
    
    //access token 
    if(!responce.status){
        res.json({message:responce?.message,status:false})
        
    }else{
       
        const {email,name,userId,profile,isGoogle,isFacebook}=responce.finduser
        const data={
            email,
            name,
            profile,
            isGoogle,
            isFacebook
           

        }
        const secure=process.env.SECURE
        if(secure=='secret'){
            const token = await createAccessTocken(email,name)
            res.cookie('user', token, {
                httpOnly: true,
                secure:true ,
                signed: true,
                maxAge:24 * 60 * 60 * 1000
            })
            res.json(data)
        }else{
            res.json({message:'not secure cookie',status:false})
        }

    }


}

return loginusercontroller

}