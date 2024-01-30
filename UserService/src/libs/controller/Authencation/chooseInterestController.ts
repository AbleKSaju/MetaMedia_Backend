import { Request, Response } from "express";

export default (dependencies: any) => {
  console.log("EnTer");

  const {
    useCase: { chooseInterest_Usecase },
  } = dependencies;
  const ChooseInterestController = async (req: Request, res: Response) => {
    console.log(req.body, "Body");
    const email: string = "ableksaju3gmail.com"; // req.session.userData.email
    const response = await chooseInterest_Usecase(dependencies).executeFunction(req.body,email);
    console.log(response, "resss in controller");
  };
  return ChooseInterestController;
};
