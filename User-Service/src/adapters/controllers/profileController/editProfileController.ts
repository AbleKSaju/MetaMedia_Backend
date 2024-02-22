import { Request, Response } from "express";
import { decodeAccessToken } from "../../../utils/jwt";

export default (dependencies:any)=>{
    const {useCase:{editUserUsecase}}=dependencies
    const EditProfileController = async(req:Request,res:Response)=>{
      console.log("EditProfileController");
      
        const { accessToken } = req.cookies;
        let userData: any = await decodeAccessToken(accessToken);
        if (userData.status) {
            const userId = userData?.data?.user?._id || userData?.data?.user?.response._id;
            const response = await editUserUsecase(dependencies).executeFunction(req.body,userId);
            if (response) {
              res.json({ status: response.status, message: response.message, user:response.user });
            }
          } else {
            res.json({ status: userData.status, message: userData.message });
          }        

    }
    return EditProfileController
}