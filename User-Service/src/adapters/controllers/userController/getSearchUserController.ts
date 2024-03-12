import { Request, Response } from "express";
import { decodeAccessToken } from "../../../utils/jwt";

export default (dependecies: any) => {
  const { getSearchUser_Usecase } = dependecies.useCase;
  const getSearchUserController = async (req: Request, res: Response) => {  
    const {user} = req.params
    console.log(user,"useruseruseruseruseruseruseruseruseruseruseruser");
    const {accessToken} = req.cookies;
    let userData:any=await decodeAccessToken(accessToken)  
    if(userData.status){
      const userId=userData?.data?.user?._id || userData?.data?.user?.response._id 
    const responce = await getSearchUser_Usecase(dependecies).executeFunction(user,userId);
    console.log(responce,"responce getSearchUserController");
    if (responce.status) {
      res.status(200).json({ status: true, data: responce.data });
    } else {
      res.status(400).json({ status: false });
    }
  }else{
    res.status(400).json({ status: false, message:"User not found" });
  }
  };
  return getSearchUserController;
};