import { Request, Response } from "express";


export default (dependencies: any) => {
    const { useCase: { CreateNewgroup_Usecase }} = dependencies;
    const createNewgroupController  = async (req: Request, res: Response) => {
      
     const {title,description,members,admin,adminName} =req.body
     const image=req?.file?.filename
     console.log(image,'THIS IS IMAGES FILE NAME');
     
     const data={
        title,
        description,
        members,
        admin,
        image,
        adminName
     }

      const response = await CreateNewgroup_Usecase(dependencies).executeFunction(data)
     
      if(response.status){
          res.json({status:true , data:response.data})
        } else {
          res.json({ status: false, message: response.message });
        }
     
    };
    return createNewgroupController ;
  };
  