import { Request, Response } from "express";
export default (dependecies: any) => {
  const {getAllusers_useCase  } = dependecies.useCase;
  const getAllUsersController = async (req: Request, res: Response) => {

 const responce= await getAllusers_useCase(dependecies).executeFunction()

    
    if (responce.status) {
      res.status(200).json({ status: true, data: responce.data });
    } else {
      res.status(400).json({ status: false ,message:responce.message});
    }
  };
  return getAllUsersController;
};
