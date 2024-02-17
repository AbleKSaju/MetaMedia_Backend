import {Request,Response} from 'express'
import { decodeAccessToken } from '../../../utils/jwt';

export default (dependecies:any)=>{
    const {useCase:{getStories_Usecase}}=dependecies
    const GetStoriesController=async(req:Request,res:Response)=>{
        console.log("ENTER TO HIGHT");
        
        const { accessToken } = req?.cookies;
        console.log(accessToken,"accessToken");
        
    let userData: any = await decodeAccessToken(accessToken);
    console.log(userData,"userData");
    
    if (userData.status) {
        const userId =userData?.data?.user?._id || userData?.data?.user?.response._id;
        const response=await getStories_Usecase(dependecies).executeFunction(userId)
        console.log(response,"response");
        if(response){
            res.json({status:response.status , message:response.message , data:response.data})
          }
        } else {
            res.json({ status: userData.status, message: userData.message , data:false });
          }        
       
    }

    return GetStoriesController
}