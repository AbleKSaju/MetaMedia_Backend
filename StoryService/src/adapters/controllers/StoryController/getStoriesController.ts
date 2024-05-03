import {Request,Response} from 'express'
import { decodeDataFromHeaders } from '../../../Utils/Jwt';

export default (dependencies:any)=>{
    const {useCase:{getStories_Usecase}}=dependencies
    const GetStoriesController=async(req:Request,res:Response)=>{
    const userId = await decodeDataFromHeaders(req.headers)    
    if(userId){
        const response=await getStories_Usecase(dependencies).executeFunction(userId)
        if(response){
            res.json({status:response.status , message:response.message , data:response.data})
          }
        } else {
            res.json({ status: userId.status, message: userId.message , data:false });
          }        
    }
    return GetStoriesController
}