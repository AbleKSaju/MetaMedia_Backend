import { Request, Response } from "express"



export default (dependecies:any)=>{
    const {}=dependecies

    const addProfileController=async(req:Request,res:Response)=>{
        console.log("ADD PROFILE CONTROLLER");
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {            
        //   return res.status(400).json({ errors: errors.array() });
        // }
        const response=addProfile_Usecases(dependecies).executeFunction(req.body)

    }
}