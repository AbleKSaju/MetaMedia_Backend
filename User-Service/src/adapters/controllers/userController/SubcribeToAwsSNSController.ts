import { Request, Response } from "express";

export default (dependecies: any) => {
  const {subscribeToAwsSNS_useCase } = dependecies.useCase;
  const SubscribeToAwsSNSController = async (req: Request, res: Response) => {  
    
    const { deviceInfo, vapidPublicKey ,userId } = req.body;

    const data={
        vapidPublicKey,
        userId,
        deviceInfo
    }

    const response = await subscribeToAwsSNS_useCase(dependecies).executeFunction(data);
   
    
    if (response.status) {
      res.status(200).json({ status: true,data:response.data });
    } else {
      res.status(400).json({ status: false,message:response.message  });
    }
  };
  return SubscribeToAwsSNSController;
};