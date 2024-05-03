import { Request, Response } from "express";
import { decodeDataFromHeaders } from "../../../Utils/Jwt";

export default (dependencies: any) => {
  const {
    useCase: { addNewHighlight_Usecase },
  } = dependencies;
  const AddNewHighlightController = async (req: Request, res: Response) => {
    const { name, selectedImages } = req.body;
    const userId = await decodeDataFromHeaders(req.headers)    
    if(userId){
      const response = await addNewHighlight_Usecase(
        dependencies
      ).executeFunction(userId, name, selectedImages);
      if (response) {        
        res.json({ status: response.status, message: response.message });
      }
    } else {
      res.json({ status: userId.status, message: userId.message });
    }
  };

  return AddNewHighlightController;
};
