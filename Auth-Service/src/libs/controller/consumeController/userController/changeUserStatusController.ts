import { Request, Response } from "express";

export const changeUserStatusController = async (dependencies: any, data: any) => {
    console.log("ENTER TO CONTROLLER");
    const { consumeUsecase: { ChangeUserStatus_Usecase }} = dependencies;
    console.log("ChangeUserStatusControllerChangeUserStatusController");
    console.log(data,"req.bodyreq.body");
    const { userId , status } = data;
    console.log(userId,status,"userIduserIduserId");
    await ChangeUserStatus_Usecase(dependencies).executeFunction(userId,status);
  };

