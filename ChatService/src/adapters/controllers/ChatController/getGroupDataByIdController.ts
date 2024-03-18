import { Request, Response } from "express";

export default (dependencies: any) => {
    const { useCase: { GetGroupDataById_useCase }} = dependencies;
    const getGroupDataById = async (req: Request, res: Response) => {
  
        const {groupId}=req.query
      
      const response = await GetGroupDataById_useCase(dependencies).executeFunction(groupId)
     
      
      if(response.status){
          res.json({status:response.status , data:response.data})
        } else {
          res.json({ status: response.status, message: response.message});
        }
    
    };
    return getGroupDataById;
  };
  