import { Request, Response } from "express";

export default (dependecies: any) => {
  const { getLikedAndCommentedPost_usecase } = dependecies.useCase;
  const getLikedAndCommentedPost_controller = async (req: Request,res: Response) => {
    try {
      const userId = req.query.id;

      if (!userId) {
        return res.json({
          status: false,
          message: "No user ID provided in the query",
        });
      }

      const response = await getLikedAndCommentedPost_usecase(
        dependecies
      ).executeFunction(userId);

      if (response.status) {
        return res.json({ status: true, post: response.post, comment: response.comment, saved:response.saved });
      } else {
        return res.json({ status: false, message: response.message });
      }
    } catch (error) {
      console.error("Error in getAllPostOfUserController:", error);
      return res.json({ status: false, message: "Internal server error" });
    }
  };
  return getLikedAndCommentedPost_controller;
};
