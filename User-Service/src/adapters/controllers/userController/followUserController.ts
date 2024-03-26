import { Request, Response } from "express";

export default (dependecies: any) => {
  const { followUser_Usecase } = dependecies.useCase;
  const followUserController = async (req: Request, res: Response) => {  
    console.log("I am followUserController");
    const {currentUserId , followedUserId} = req.body
    const response = await followUser_Usecase(dependecies).executeFunction(currentUserId , followedUserId);
    
    if (response.status) {
      res.status(200).json({ status: true, message:response.message });
    } else {
      res.status(400).json({ status: false });
    }
  };
  return followUserController;
};