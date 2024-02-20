import { Request, Response } from "express";
import dependencies from "../../../frameworks/config/dependencies";
import { decodeAccessToken } from "../../../utils/jwt";

export default (dependencies:any)=>{
    const {useCase: { GetHighlightData_Usecase } } = dependencies
    const GetHighlightsController = async(req:Request,res:Response)=>{
        const { accessToken } = req?.cookies;
        let userData: any = await decodeAccessToken(accessToken);
        if (userData.status) {
            const userId = userData?.data?.user?._id || userData?.data?.user?.response._id;
            const response = await GetHighlightData_Usecase(dependencies).executeFunction(userId)
            console.log(response,"response");
            
                if(response){
                    res.json({status:response.status , message:response.message , data:response.data})
                  }
            } else {
                res.json({ status: userData.status, message: userData.message , data:false });
              }   
        }
    return GetHighlightsController
}