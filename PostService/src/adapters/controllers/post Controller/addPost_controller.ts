import { Request, Response } from "express";
export default (dependencies: any) => {
  const { addPostUseCase } = dependencies.useCase;

  const addPostController = async (req: Request, res: Response) => {
    try {
      console.log("addPostController");
      
      const { body, files } = req;
      console.log(body, "434343434434343434344343");
      if (!files || !Array.isArray(files)) {
        return res.status(400).json({ message: "No files uploaded" });
      }
      const images: string[] = files.map(
        (file: Express.Multer.File) => file.filename
      );
      const data = {
        images,
        data: body,
      };

      const response = await addPostUseCase(dependencies).executeFunction(data);
      if (response.status) {
        return res.status(200).json({ status: true, data: response });
      } else {
        return res.status(400).json({ message: "Error hapence" });
      }
    } catch (error) {
      console.error("Error in addPostController:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  return addPostController;
};
