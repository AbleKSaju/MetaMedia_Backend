import { Request, Response } from "express";


export default (dependencies: any) => {
  const {
    useCase: { SendGroupMessage_UseCase },
  } = dependencies;
  const sendMessageController = async (req: Request, res: Response) => {
    
       const {group_id,sender_id,content,type,metadata}=req.body
       const data={
        group_id,
        sender_id,
        content,
        type,
        metadata
       }
        const response = await SendGroupMessage_UseCase(dependencies).executeFunction(data)
        if(response.status){
            res.json({status:response.status , data:response.data})
          } else {
            res.json({ status: response.status ,message:response.message});
        }       
  };
  return sendMessageController;
};
