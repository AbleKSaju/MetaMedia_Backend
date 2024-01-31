import { Request, Response } from "express";
import { validationResult } from "express-validator";

export default (dependencies: any) => {
  const {
    useCase: { createUser_Usecases },
  } = dependencies;

  const createUserController = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
 
    const body =req.body
    const data={
        name:body.name,
        email:body.email,
        password:body.password,
        isGoogle:false,
        isFacebook:false,
        profileUrl:"",
    }

    const response = await createUser_Usecases(dependencies).executeFunction(data);

    if (response.status) {
      const { data, otp } = response;
      req.session.userData = data;
      req.session.Otp = otp;
      res.json({ status: response?.status});
    }else{
        res.json({ status: response?.status, message: response?.message });
    }
  };

  return createUserController;
};
