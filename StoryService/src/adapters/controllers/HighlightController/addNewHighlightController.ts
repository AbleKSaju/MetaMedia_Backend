import { Request, Response } from "express";
import { decodeAccessToken } from "../../../utils/jwt";

export default (dependencies: any) => {
  const {
    useCase: { addNewHighlight_Usecase },
  } = dependencies;
  const AddNewHighlightController = async (req: Request, res: Response) => {
    console.log(req.body, "body");
    const { accessToken } = req?.cookies;
    const { name, selectedImages } = req.body;
    let userData: any = await decodeAccessToken(accessToken);
    console.log(userData, "userData");

    if (userData.status) {
      const userId =
        userData?.data?.user?._id || userData?.data?.user?.response._id;

      const response = await addNewHighlight_Usecase(
        dependencies
      ).executeFunction(userId, name, selectedImages);
      if (response) {
        console.log(response,"rrrr");
        
        res.json({ status: response.status, message: response.message });
      }
    } else {
      res.json({ status: userData.status, message: userData.message });
    }
  };

  return AddNewHighlightController;
};
