import { Request, Response } from "express";
import { clearAccessTokenFromCookie } from "../../../utils/jwt/jwt";

export default (dependencies: any) => {
  const logoutController = (req: Request, res: Response) => {
    console.log(req.cookies,"cookie");
    try {
    clearAccessTokenFromCookie("accessToken",res)
    res.clearCookie("accessToken");    
      res.json({ status: true, message: "Logout success" });
    } catch (err) {
        console.log(err,"er");
      res.json(err);
    }
  };
  return logoutController;
};
