import { Request, Response } from "express"



export default (dependecies:any)=>{
    
    const {addProfile_Usecases}=dependecies

    const addProfileController=async(req:Request,res:Response)=>{
        console.log("CONTROLLER");
        console.log(req.session.userData,"dataa");
        
        const id:string=req.session.userData._id
        const data = {
            body: req.body,
            // file: req.file,
            id:id
          };

        console.log("ADD PROFILE CONTROLLER");
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {            
        //   return res.status(400).json({ errors: errors.array() });
        // }
        // let a=
        const response=addProfile_Usecases(dependecies).executeFunction(data)

    }
    return addProfileController
}