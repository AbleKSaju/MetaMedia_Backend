import { Request, Response } from "express";
import { decodeAccessToken } from "../../../utils/jwt/jwt";

export default (dependencies: any) => {
  const {
    useCase: { getMessages_UseCase },
  } = dependencies;
  const getMessagesController = async (req: Request, res: Response) => {
    console.log("I am getMessagesControlleraaaaaaa");
    console.log(req.params,"req.params");
    const conversationId = req.params.conversationId;
    const receiverId = req.query.receiverId;
    const {accessToken} = req.cookies;
    let userData:any=await decodeAccessToken(accessToken)  
    if(userData.status){
        const senderId=userData?.data?.user?._id || userData?.data?.user?.response._id 
        const response = await getMessages_UseCase(dependencies).executeFunction(conversationId,senderId,receiverId)
        console.log(response,"response from controller");
        if(response){
            res.json({status:response.status , data:response.data})
          } else {
            res.json({ status: response.status });
          }
        }
  };
  return getMessagesController;
};
