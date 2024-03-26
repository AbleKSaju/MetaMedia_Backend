import { Request, Response } from "express";


export default (dependencies: any) => {
  const {
    useCase: { SendGroupMessage_UseCase },
  } = dependencies;
  const sendVoiceMessageController = async (req: Request, res: Response) => {
    
       const audio=req.file?.filename
       console.log(audio,'THIS IS AUDIO');
       
       const {group_id,sender_id,type,metadata}=req.body
       const data={
        group_id,
        sender_id,
        content:audio,
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
  return sendVoiceMessageController;
};
