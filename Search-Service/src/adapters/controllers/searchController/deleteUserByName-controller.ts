import { log } from "console";
import { Request, Response } from "express";
export default (dependecies: any) => {
  const { deletUserByName_useCase } = dependecies.useCase;
  const deleteUserByName = async (req: Request, res: Response) => {


    const {name}=req.body
    
    
 const responce= await deletUserByName_useCase(dependecies).executeFunction(name)

    
    if (responce.status) {
      res.status(200).json({ status: true, data: responce.data });
    } else {
      res.status(400).json({ status: false ,message:responce.message});
    }
  };
  return deleteUserByName;
};
