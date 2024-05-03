import { Request, Response } from "express";
import { decodeDataFromHeaders } from "../../../Utils/Jwt";

export default (dependencies: any) => {
  const {
    useCase: { AddStory_useCase },
  } = dependencies;
  const AddStoryController = async (req: Request, res: Response) => {
    console.log("i am AddStoryController");
    const { caption , profile } = req?.body;
    const userId = await decodeDataFromHeaders(req.headers)    
    if(userId){
      const imageUrl = req?.file?.filename;
      
      const data = { userId, caption, imageUrl, profile };
      const response = await AddStory_useCase(dependencies).executeFunction(data);
      
      if(response){
        res.json({status:response.status , message:response.message})
      }
    } else {
        res.json({ status: userId.status, message: userId.message });
      }
  };
  return AddStoryController;
};