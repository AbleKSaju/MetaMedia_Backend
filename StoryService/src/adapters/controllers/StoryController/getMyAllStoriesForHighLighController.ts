import { Request, Response } from "express";
import { decodeAccessToken } from "../../../Utils/Jwt";

export default (dependencies:any)=>{
    const {useCase:{getMyAllStoriesForHighlight_Usecase}}=dependencies
    const GetMyAllStoriesForHighLighController=async(req:Request,res:Response)=>{
      const { accessToken } = req?.cookies;
      let userData: any = await decodeAccessToken(accessToken);
      if (userData.status) {
          const userId =userData?.data?.user?._id || userData?.data?.user?.response._id;
        const response=await getMyAllStoriesForHighlight_Usecase(dependencies).executeFunction(userId)
        console.log(response,"response by cont");
        
        if(response){
            res.json({status:response.status , message:response.message , data:response.data})
          } else {
            res.json({status:false , message:"response not found ", data:false})
          }
        }
    }
    return GetMyAllStoriesForHighLighController
}