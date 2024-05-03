import { Request, Response } from "express";

export default (dependencies: any) => {
    const { useCase: { deleteMessage_UseCase }} = dependencies;
    const deleteMessage = async (req: Request, res: Response) => {
      const {id} = req.params;  
      const response = await deleteMessage_UseCase(dependencies).executeFunction(id)
      if(response.status){
          res.json({status:response.status , message:response.message})
        } else {
          res.json({ status: response.status, message: response.message});
        }
    };
    return deleteMessage;
  };
  