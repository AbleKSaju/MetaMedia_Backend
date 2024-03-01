import { Request, Response } from "express";
export default (dependecies: any) => {
  const { getUserByName_useCase } = dependecies.useCase;
  const getUserByNameController = async (req: Request, res: Response) => {
   
   

    const userName:string=req.query.name as string

    console.log(userName,'this is name');
    

    const responce=await getUserByName_useCase(dependecies).executeFunction(userName)
 

    
    if (responce.status) {
      res.status(200).json({ status: true, data: responce.data });
    } else {
      res.status(400).json({ status: false ,message:responce.message});
    }
  };
  return getUserByNameController;
};
