import { Request, Response } from "express";

export const createUserController = async (dependencies: any, data: any) => {
    console.log("ENTER TO CONTROLLER");
    const { consumeUsecase: { createUserUsecase }} = dependencies;
    console.log("ENTER TO createUserController");
    const response = await createUserUsecase(dependencies).executeFunction(data);
    console.log(response,"response from controler");
    
    // if (!responce.status) {
    //   res.json({ message: responce?.message, status: false });
    // } else {
    // }
  };

