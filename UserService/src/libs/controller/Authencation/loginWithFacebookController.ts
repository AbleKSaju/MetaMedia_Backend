import { Request, Response } from "express";
import dependencies from "../../../config/dependencies";

export default (dependencies: any) => {
  const { useCase: { loginWithFacebook_Usecase }} = dependencies;
  const loginWithFaceBook = async (req: Request, res: Response) => {
    const {profile, email, name, isGoogle, isFacebook} = req.body;
    const data = { profile, email, password: "", name, isGoogle, isFacebook };
    const response = await loginWithFacebook_Usecase(dependencies).executeFunction(data);
    if (response.status) {
      res.json({status: true,message: response.message,data: response.user});
    } else {
      res.json({ status: response.status, message: response.message });
    }
  };
  return loginWithFaceBook;
};
