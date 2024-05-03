import { Request, Response } from "express";

export default (dependencies: any) => {
    const { useCase: { GetAllGroupsOfUser_useCase }} = dependencies;
    const getAllGroupsOfUserController = async (req: Request, res: Response) => {
   
      const userId=req?.query?.id
      const response = await GetAllGroupsOfUser_useCase(dependencies).executeFunction(userId)
      
      if(response.status){
          res.json({status:response.status , message:response.message, data:response.data})
        } else {
          res.json({ status: response.status, message: response.message, data:false });
        }
     
    };
    return getAllGroupsOfUserController;
  };
  