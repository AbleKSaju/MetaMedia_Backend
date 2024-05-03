import { Request, Response } from "express";
import { decodeDataFromHeaders } from "../../../Utils/Jwt";

export default (dependencies: any) => {
  const {
    useCase: { AddStory_useCase },
  } = dependencies;
  const AddVideoController = async (req: Request, res: Response) => {

    const { imageUrl,caption,profile } = req?.body;
    const userId = await decodeDataFromHeaders(req.headers)    
    if(userId){
      const data = { userId, imageUrl, caption, profile };
      console.log(data,"Dataaa");
      
      const response = await AddStory_useCase(dependencies).executeFunction(data);
      
      if(response){
        res.json({status:response.status , message:response.message})
      }
    } else {
        res.json({ status: userId.status, message: userId.message });
      }
  };
  return AddVideoController;
};
