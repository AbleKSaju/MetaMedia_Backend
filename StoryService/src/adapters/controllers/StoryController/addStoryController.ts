import { Request, Response } from "express";
import { decodeAccessToken } from "../../../utils/jwt";

export default (dependencies: any) => {
  const {
    useCase: { AddStory_useCase },
  } = dependencies;
  const AddStoryController = async (req: Request, res: Response) => {
    
    const { caption } = req?.body;
    const { accessToken } = req?.cookies;
    let userData: any = await decodeAccessToken(accessToken);
    if (userData.status) {
      const userId =userData?.data?.user?._id || userData?.data?.user?.response._id;
      const imageUrl = req?.file?.filename;
      const data = { userId, caption, imageUrl };
      const response = await AddStory_useCase(dependencies).executeFunction(data);
      console.log(response,"RESP");
      
      if(response){
        res.json({status:response.status , message:response.status , data:response.data})
      }
    } else {
        res.json({ status: userData.status, message: userData.message });
      }
  };
  return AddStoryController;
};
