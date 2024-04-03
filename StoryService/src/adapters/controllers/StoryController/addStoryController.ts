import { Request, Response } from "express";
import { decodeAccessToken } from "../../../Utils/Jwt";

export default (dependencies: any) => {
  const {
    useCase: { AddStory_useCase },
  } = dependencies;
  const AddStoryController = async (req: Request, res: Response) => {
    console.log("i am AddStoryController");
    const { caption , profile } = req?.body;
    const { accessToken } = req?.cookies;
    let userData: any = await decodeAccessToken(accessToken);
    if (userData.status) {
      const userId =userData?.data?.user?._id || userData?.data?.user?.response._id;
      const imageUrl = req?.file?.filename;
      
      const data = { userId, caption, imageUrl, profile };
      const response = await AddStory_useCase(dependencies).executeFunction(data);
      
      if(response){
        res.json({status:response.status , message:response.message})
      }
    } else {
        res.json({ status: userData.status, message: userData.message });
      }
  };
  return AddStoryController;
};