import { Request, Response } from "express";

export default (dependecies: any) => {
  const { genarateVapidKeys_useCase } = dependecies.useCase;
  const genarateVapidKeysController = async (req: Request, res: Response) => {  
    

    console.log('IN HEREEEEEEEEEEEEE');
    
    const {userId} = req.body;

    const data={
        userId
        
    }

    const response = await genarateVapidKeys_useCase(dependecies).executeFunction(data);
   
    
    if (response.status) {
      res.status(200).json({ status: true,data:response.data });
    } else {
      res.status(400).json({ status: false,message:response.message  });
    }
  };
  return genarateVapidKeysController;
};