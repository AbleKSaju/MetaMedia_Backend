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

        //send the reponce
        res.send({responce})

    }


}

return loginusercontroller

}