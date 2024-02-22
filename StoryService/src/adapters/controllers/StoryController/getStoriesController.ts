import {Request,Response} from 'express'
import { decodeAccessToken } from '../../../utils/jwt';

export default (dependencies:any)=>{
    const {useCase:{getStories_Usecase}}=dependencies
    const GetStoriesController=async(req:Request,res:Response)=>{
    const { accessToken } = req?.cookies;
    let userData: any = await decodeAccessToken(accessToken);
    if (userData.status) {
        const userId =userData?.data?.user?._id || userData?.data?.user?.response._id;
        const response=await getStories_Usecase(dependencies).executeFunction(userId)
        if(response){
            res.json({status:response.status , message:response.message , data:response.data})
          }
        } else {
            res.json({ status: userData.status, message: userData.message , data:false });
          }        
    }
    return GetStoriesController
}