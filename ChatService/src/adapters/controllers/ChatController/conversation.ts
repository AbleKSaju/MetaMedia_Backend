import { Request, Response } from "express";
// import { decodeAccessToken } from "../../../utils/jwt";

export default (dependencies: any) => {
  const {
    useCase: { Conversation_UseCase },
  } = dependencies;
  const Conversation = async (req: Request, res: Response) => {
    console.log("I am Conversation");
    
        const { senderId, receiverId } = req.body;
        const response = await Conversation_UseCase(dependencies).executeFunction(senderId, receiverId)
        if(response){
            res.json({status:response.status , message:response.message})
          } else {
            res.json({ status: response.status, message: response.message });
          }
  };
  return Conversation;
};
