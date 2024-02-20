import { Request, Response } from "express";
import { decodeAccessToken } from "../../../utils/jwt";

export default (dependencies: any) => {
  const { useCase: { DeleteHighlight_Usecase }} = dependencies;
  const DeleteHighlightController = async (req: Request, res: Response) => {
    console.log(req.body, "body");
    const { accessToken } = req?.cookies;
    const { name, image } = req.body;
    let userData: any = await decodeAccessToken(accessToken);
    console.log( name, image ," name, selectedImages ");
    
    if (userData.status) {
      const userId = userData?.data?.user?._id || userData?.data?.user?.response._id;

      const response = await DeleteHighlight_Usecase(dependencies).executeFunction(userId, name, image);
      if (response) {
        console.log(response,"rrrr");
        
        res.json({ status: response.status, message: response.message });
      }
    } else {
      res.json({ status: userData.status, message: userData.message });
    }
  };

  return DeleteHighlightController;
};
