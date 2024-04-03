import { Request, Response } from "express";
import { decodeAccessToken } from "../../../utils/jwt";

export default (dependencies:any)=>{
    const {useCase:{AddProfileImageUsecase}}=dependencies
    const AddProfileImageController=async (req:Request,res:Response)=>{
        const { accessToken } = req?.cookies;
        let userData: any = await decodeAccessToken(accessToken);
        if (userData.status) {            
          const userId = userData?.data?.user?._id || userData?.data?.user?.response._id;
          const imageUrl=req?.file?.filename
          const response = await AddProfileImageUsecase(dependencies).executeFunction(imageUrl,userId);
          if (response) {
            console.log( response.status,  response.message ,response?.data ,"dataaa");
            
            res.json({ status: response.status, message: response.message ,data:response?.data });
          }
        } else {
          res.json({ status: userData.status, message: userData.message });
        }

    }
    return AddProfileImageController
}