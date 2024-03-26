import { Request, Response } from "express";
// import { decodeAccessToken } from "../../../utils/jwt";

export default (dependencies: any) => {
  const {useCase: { Message_UseCase }} = dependencies;
  const MessageControler = async (req: Request, res: Response) => {
    console.log("I am MessageControler");
    
    const { conversationId, senderId, message, receiverId,lastUpdate } = req.body;
    console.log(conversationId,senderId, message, receiverId,lastUpdate,"senderId, message, receiverId");
        if (!senderId || !message) return {status:false, message:'Please fill all required fields'}
        const response = await Message_UseCase(dependencies).executeFunction(conversationId, senderId, message, receiverId,lastUpdate)
    console.log(response,"response from controller");
    
        if(response){
            res.json({status:response.status , message:response.message})
          } else {
            res.json({ status: response.status, message: response.message });
          }
  };
  return MessageControler;
};
