import { Request, Response } from "express";

export default (dependecies: any) => {
    const {getAllPostOfUser_useCase}=dependecies.useCase
  const getAllPostOfUserController = async (req: Request, res: Response) => {
    console.log("I AM getAllPostOfUserController");
    
    try {
      const userId = req.query.id;
console.log(userId,"userIduserIduserIduserIduserId");

      if (!userId) {
        return res.status(400).json({ status: false, message: "No user ID provided in the query" });
      }

      const response = await getAllPostOfUser_useCase(dependecies).executeFunction(userId);
      console.log(response,"responseresponse");
      

      if (response.status) {
        return res.json({ status: true, data: response.data, tagged:response.tagged });
      } else {
        return res.json({ status: false, message: response.message});
      }
    } catch (error) {
      console.error("Error in getAllPostOfUserController:", error);
      return res.json({ status: false, message: "Internal server error" });
    }
  };
  return getAllPostOfUserController;
};
