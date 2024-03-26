import { Request, Response } from "express";

export default (dependencies: any) => {
  const {
    useCase: { singleUserSendFile_Usecase },
  } = dependencies;
  const singleUserSendFileController = async (req: any, res: Response) => {
    console.log(req.body, "req.body");
    console.log(req.file, "req.body");

    const { conversationId, senderId, type, receiverId } =
      req.body;
    const data = {
      conversationId,
      senderId,
      type,
      receiverId,
      filename:req.file.filename
    };
    console.log(data,"datadatadata");
    
    const response = await singleUserSendFile_Usecase(
      dependencies
    ).executeFunction(data);
    if (response.status) {
      res.json({ status: response.status, data: response.data });
    } else {
      res.json({ status: response.status, message: response.message });
    }
  };
  return singleUserSendFileController;
};
