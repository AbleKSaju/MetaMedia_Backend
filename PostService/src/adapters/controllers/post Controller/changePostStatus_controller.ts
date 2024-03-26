import { Request, Response } from "express";
export default (dependencies: any) => {
  const { ChangePostStatus_usecase } = dependencies.useCase;

  const ChangePostStatusController = async (req: Request, res: Response) => {
    try {
        const { postId } = req.body;
        console.log(postId,"postIdpostId");
        
      const response = await ChangePostStatus_usecase(dependencies).executeFunction(postId);
      if (response.status) {
        return res.status(200).json({ status: true, data: response });
      } else {
        return res.status(400).json({ message: "Error Occur" });
      }
    } catch (error) {
      console.error("Error in Change Post Status:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  return ChangePostStatusController;
};
