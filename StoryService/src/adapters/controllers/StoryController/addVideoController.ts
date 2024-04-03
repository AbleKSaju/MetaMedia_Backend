import { Request, Response } from "express";
import { decodeAccessToken } from "../../../Utils/Jwt";

export default (dependencies: any) => {
  const {
    useCase: { AddStory_useCase },
  } = dependencies;
  const AddVideoController = async (req: Request, res: Response) => {
    console.log("i am videoUrl");
    console.log(req.body,"BODyyy");

    const { imageUrl,caption,profile } = req?.body;
    const { accessToken } = req?.cookies;
    console.log(accessToken,"accessToken");
    
    let userData: any = await decodeAccessToken(accessToken);
    console.log(userData,"userDatauserData");
    
    if (userData.status) {
      const userId =userData?.data?.user?._id || userData?.data?.user?.response._id;
      
      const data = { userId, imageUrl, caption, profile };
      console.log(data,"Dataaa");
      
      const response = await AddStory_useCase(dependencies).executeFunction(data);
      
      if(response){
        res.json({status:response.status , message:response.message})
      }
    } else {
        res.json({ status: userData.status, message: userData.message });
      }
  };
  return AddVideoController;
};
