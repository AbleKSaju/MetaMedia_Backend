  import { Request, Response } from "express";
  import { decodeAccessToken } from "../../../utils/jwt/jwt";

  export default (dependencies: any) => {
      const { useCase: { getConversations_UseCase }} = dependencies;
      const getConversation = async (req: Request, res: Response) => {
        console.log("I am ConversationController");
        const {accessToken} = req.cookies;

      let userData:any=await decodeAccessToken(accessToken)        

      if(userData.status){
        const userId=userData?.data?.user?._id || userData?.data?.user?.response._id         
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
    