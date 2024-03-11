import { Request, Response } from "express";

export default (dependecies: any) => {
  const { getSearchUser_Usecase } = dependecies.useCase;
  const getSearchUserController = async (req: Request, res: Response) => {  
    const {user} = req.params
    console.log(user,"useruseruseruseruseruseruseruseruseruseruseruser");
    
    const responce = await getSearchUser_Usecase(dependecies).executeFunction(user);
    console.log(responce,"responce getSearchUserController");
    
    if (responce.status) {
      res.status(200).json({ status: true, data: responce.data });
    } else {
      res.status(400).json({ status: false });
    }
  };
  return getSearchUserController;
};