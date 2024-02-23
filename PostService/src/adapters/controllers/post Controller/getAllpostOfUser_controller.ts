import { Request, Response } from "express";

export default (dependecies: any) => {
    const {getAllPostOfUser_useCase}=dependecies.useCase
  const getAllPostOfUserController = async (req: Request, res: Response) => {
    try {
      const userId = req.query.id;

      if (!userId) {
        return res.status(400).json({ status: false, message: "No user ID provided in the query" });
      }

      const response = await getAllPostOfUser_useCase(dependecies).executeFunction(userId);

      if (response.status) {
        return res.status(200).json({ status: true, data: response.data });
      } else {
        return res.status(400).json({ status: false, message: response.message || "Failed to retrieve user posts" });
      }
    } catch (error) {
      console.error("Error in getAllPostOfUserController:", error);
      return res.status(500).json({ status: false, message: "Internal server error" });
    }
  };

  return getAllPostOfUserController;
};
