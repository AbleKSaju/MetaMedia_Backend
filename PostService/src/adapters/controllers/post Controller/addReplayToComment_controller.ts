import { Request, Response } from "express";
const { check, validationResult } = require("express-validator");
export default (dependecies: any) => {
  const addReplayToCommentController = async (req: Request, res: Response) => {
    const {
      useCase: { addReplayToComment_UseCase },
    } = dependecies;
    if (!addReplayToComment_UseCase) return { status: false };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        status: false,
        message: "validation error",
        errors: errors.array(),
      });
    }
    const { postId, commentId, content, userId } = req.body;
    const data = {
      postId,
      commentId,
      content,
      userId,
    };

    const responce = await addReplayToComment_UseCase(
      dependecies
    ).executeFunction(data);
    if (responce.status) {
      res.status(200).json({ status: true, data: responce.data });
    } else {
      res.status(400).json({ status: false });
    }
  };

  return addReplayToCommentController;
};
