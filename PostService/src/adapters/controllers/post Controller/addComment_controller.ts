import { Request, Response } from "express";
export default (dependecies: any) => {
  const { addComment_UseCase } = dependecies.useCase;
  const addCommentController = async (req: Request, res: Response) => {
    const { postId, userId, content } = req.body;
    const data = { postId, userId, content };
    const responce = await addComment_UseCase(dependecies).executeFunction(data);
    if (responce.status) {
      res.status(200).json({ status: true, data: responce.data });
    } else {
      res.status(400).json({ status: false });
    }
  };
  return addCommentController;
};
