import { Request, Response } from "express";
import { decodeDataFromHeaders } from "../../../Utils/jwt/jwt";

export default (dependencies: any) => {
  const {
    useCase: { getMessages_UseCase },
  } = dependencies;
  const getMessagesController = async (req: Request, res: Response) => {
    console.log(req.params,"req.params");
    const conversationId = req.params.conversationId;
    const receiverId = req.query.receiverId;
    const senderId = await decodeDataFromHeaders(req.headers)    
    if(senderId){
        const response = await getMessages_UseCase(dependencies).executeFunction(conversationId,senderId,receiverId)
        if(response){
            res.json({status:response.status , data:response.data})
          } else {
            res.json({ status: response.status });
          }
        }
  };
  return getMessagesController;
};
