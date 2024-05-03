import { Request, Response } from "express";
import { decodeDataFromHeaders } from "../../../Utils/Jwt";

export default (dependencies: any) => {
  const { useCase: { DeleteHighlight_Usecase }} = dependencies;
  const DeleteHighlightController = async (req: Request, res: Response) => {
    console.log(req.body, "body");
    const { name, image } = req.body;
    const userId = await decodeDataFromHeaders(req.headers)    
    if(userId){
      const response = await DeleteHighlight_Usecase(dependencies).executeFunction(userId, name, image);
      if (response) {
        console.log(response,"rrrr");
        
        res.json({ status: response.status, message: response.message });
      }
    } else {
      res.json({ status: userId.status, message: userId.message });
    }
  };

  return DeleteHighlightController;
};
