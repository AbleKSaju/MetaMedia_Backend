  import { Request, Response } from "express";
  import { decodeDataFromHeaders } from "../../../Utils/jwt/jwt";

  export default (dependencies: any) => {
      const { useCase: { getConversations_UseCase }} = dependencies;
      const getConversation = async (req: Request, res: Response) => {
        console.log("I am ConversationController");
        const userId = await decodeDataFromHeaders(req.headers)    
    if(userId){       
        const response = await getConversations_UseCase(dependencies).executeFunction(userId)
        
        if(response.status){
            res.json({status:response.status , message:response.message, data:response.data})
          } else {
            res.json({ status: response.status, message: response.message, data:false });
          }
      }
      };
      return getConversation;
    };
    