import {Request,Response} from 'express'
import { validationResult } from 'express-validator'
import { createAccessToken } from '../../../utils/jwt'

export default (dependecies:any)=>{
    const {useCase:{loginUser_usecases}}=dependecies

const loginusercontroller=async(req:Request,res:Response)=>{
  

    const {email,password}=req.body

    //check any validation errro
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({message:"validation error", errors: errors.array() });
    }
    //exicute usecase
    const responce=await loginUser_usecases(dependecies).executeFunction(email,password)
    //access token 
    if(!responce.status){
        res.json({message:responce?.message,status:false})

    }else{

        const {accesstoken,refreshtoken,user,message}=responce
      const userWithOutpassword={
        _id:user._id,
        name:user.basicInformation.fullName,
        email:user.basicInformation.email,
        isGoogle:user.basicInformation.isGoogle,
        isFacebook:user.basicInformation.isFacebook,
        profile:user.profile.profileUrl || '',
        interest:user.profile.interests || []
      }
      req.session.refreshToken=refreshtoken
      const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      res.cookie('accessToken',accesstoken,{
       expires:expirationDate,
       httpOnly:true,
       secure:true
      })

     res.status(201).json({status:true,accesstoken:accesstoken,user:userWithOutpassword,message:message})

    }


}

return loginusercontroller

}