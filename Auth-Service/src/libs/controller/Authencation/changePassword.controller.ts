import { Request, Response } from "express";

export default (dependencies: any) => {
  const {
    useCase: { changePassword_Usecase },
  } = dependencies;

  const changePasswordController = async (req: Request, res: Response) => {
    const { password,email,oldPassword } = req.body;    
    const response = await changePassword_Usecase(dependencies).executeFunction(email,password,oldPassword);
    if (response) {
      res.json({ status: response.status, message: response.message });
    } else {
      res.json({ status: false, message: "Internal error" });
    }
  };
  return changePasswordController;
};
