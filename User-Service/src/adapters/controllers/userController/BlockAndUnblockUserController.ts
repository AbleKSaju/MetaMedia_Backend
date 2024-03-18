import { Request, Response } from "express";
import { decodeAccessToken } from "../../../utils/jwt";

export default (dependencies: any) => {
    const BlockAndUnblockUserController = async (req: Request, res: Response) => {
      const { useCase: { BlockAndUnblockUser_Usecase }} = dependencies;
    const {accessToken} = req.cookies;
    let userData:any=await decodeAccessToken(accessToken)  
    if(userData.status){
      const myId=userData?.data?.user?._id || userData?.data?.user?.response._id 
    const  {userId}  = req.body;
      const response = await BlockAndUnblockUser_Usecase(dependencies).executeFunction(myId,userId);
      if (response) {
        res.json({ status: response.status, message: response.message, data:response.data });
      }
  }else{
    res.json({ status: false, message: "User not found" ,data:false });
  }
}

  return BlockAndUnblockUserController;
};
