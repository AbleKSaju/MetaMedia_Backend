import { Request, Response } from "express";

export default (dependecies: any) => {
  const { getAllUsersData_usecase } = dependecies.useCase;
  const getAllUsersDataController = async (req: Request, res: Response) => {  
    console.log("getAllUsersDataController");
    
    const responce = await getAllUsersData_usecase(dependecies).executeFunction();
    
    if (responce.status) {
      res.status(200).json({ status: true, data: responce.data });
    } else {
      res.status(400).json({ status: false });
    }
  };
  return getAllUsersDataController;
};