import { Request,Response } from "express";
import {validationResult} from 'express-validator'

export default (dependencies:any)=>{
    const {
        useCase:{createUser_Usecases}
    }=dependencies
 

    const createUserController=async(req:Request,res:Response)=>{        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {     
            console.log('hi');
                   
          return res.status(400).json({ errors: errors.array() });
        }
         const response=await createUser_Usecases(dependencies).executeFunction(req.body)         
         
         if(response.status){
            const {data,otp}=response            
            req.session.userData=data
            req.session.Otp=otp    
            res.status(201).json({message:"Otp sent success"})
         }else{            
            res.status(400).json(response.message)
         }
         

        
    }

    return createUserController
}