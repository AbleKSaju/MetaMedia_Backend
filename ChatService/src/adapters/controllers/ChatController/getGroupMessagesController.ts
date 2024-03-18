import { Request, Response } from "express";

export default (dependencies: any) => {
    const { useCase: { getGroupMessages_useCase }} = dependencies;
    const getGroupMessagesController = async (req: Request, res: Response) => {
  
        const {groupId}=req.query
      
      const response = await getGroupMessages_useCase(dependencies).executeFunction(groupId)
     
      
      if(response.status){
          res.json({status:response.status , message:response.message, data:response.data})
        } else {
          res.json({ status: response.status, message: response.message, data:false });
        }
    
    };
    return getGroupMessagesController;
  };
  