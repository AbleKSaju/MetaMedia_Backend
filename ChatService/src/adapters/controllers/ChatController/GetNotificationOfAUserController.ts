import { Request, Response } from "express";


export default (dependencies: any) => {
  const {
    useCase: { GetNotificationOfUser_useCase },
  } = dependencies;
  const getNoificationOfUserController = async (req: Request, res: Response) => {
      
    const {userId}=req.query
      
       
        const response = await GetNotificationOfUser_useCase(dependencies).executeFunction(userId)
        if(response.status){
            res.json({status:response.status , data:response.data})
          } else {
            res.json({ status: response.status ,message:response.message});
        }       
  };
  return getNoificationOfUserController;
};
