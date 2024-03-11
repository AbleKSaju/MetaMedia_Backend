import { Request, Response } from "express";
export default (dependecies: any) => {
  const { createNewUser_useCase } = dependecies.useCase;
  const createNewUserController = async (req: Request, res: Response) => {



const {userId,userName,profileUrl,followers,following,blockedUsers}=req.body

const data={
    userId,
    userName,
    profileUrl,
    followers,
    following,
    blockedUsers
}
    
 const responce= await createNewUser_useCase(dependecies).executeFunction(data)

    
    if (responce.status) {
      res.status(200).json({ status: true, data: responce.data });
    } else {
      res.status(400).json({ status: false ,message:responce.message});
    }
  };
  return createNewUserController;
};
