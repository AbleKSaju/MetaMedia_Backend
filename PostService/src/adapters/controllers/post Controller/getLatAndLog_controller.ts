import {Request,Response} from 'express'

export default (dependecies:any)=>{
    const getLatAndLog_controller=async(req:Request,res:Response)=>{

        console.log(req.body,'this is bodyyyy');
        
      const {getLatAndLog_useCase}=dependecies.useCase
        
      const responce= await getLatAndLog_useCase(dependecies).executeFunction(req.body)


res.json(responce)
    }

    return getLatAndLog_controller
} 