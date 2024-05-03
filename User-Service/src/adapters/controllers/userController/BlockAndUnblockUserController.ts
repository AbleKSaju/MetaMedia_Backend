import { Request, Response } from "express";
import { decodeDataFromHeaders } from "../../../Utils/Jwt/decodeUserDataFromHeaders";

export default (dependencies: any) => {
    const BlockAndUnblockUserController = async (req: Request, res: Response) => {
      const { useCase: { BlockAndUnblockUser_Usecase }} = dependencies;
      const myId = await decodeDataFromHeaders(req.headers)    
      if(myId){
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
