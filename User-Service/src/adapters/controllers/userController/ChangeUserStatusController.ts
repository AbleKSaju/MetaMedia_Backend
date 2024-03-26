import { Request, Response } from "express";

export default (dependencies: any) => {
  const { useCase: { ChangeUserStatus_Usecase }} = dependencies;
  const ChangeUserStatusController = async (req: Request, res: Response) => {
    const { userId } = req.body;
      const response = await ChangeUserStatus_Usecase(dependencies).executeFunction(userId);
      if (response) {
        console.log(response,"rrrr");
        res.json({ status: response.status, message: response.message });
      }
  };

  return ChangeUserStatusController;
};
