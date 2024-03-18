import { Request, Response } from "express";

export default (dependecies: any) => {
  const { getAllUsers_usecasse } = dependecies.useCase;
  const getAllUserForChatController = async (req: Request, res: Response) => {  
    console.log("getAllUserForChatController");
      
    const responce = await getAllUsers_usecasse(dependecies).executeFunction();
    
    if (responce.status) {
      res.status(200).json({ status: true, data: responce.data });
    } else {
      res.status(400).json({ status: false });
    }
  };
  return getAllUserForChatController;
};