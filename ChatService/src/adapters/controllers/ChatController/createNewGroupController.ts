import { Request, Response } from "express";


export default (dependencies: any) => {
    const { useCase: { CreateNewgroup_Usecase }} = dependencies;
    const createNewgroupController  = async (req: Request, res: Response) => {
      
     const {title,description,members,admin,adminName} =req.body
     const image=req?.file?.filename
     console.log(members,'THIS IS IMAGES FILE NAME',JSON.parse(members),'ppppppp');
      const membersData=JSON.parse(members)
     const data={
        title,
        description,
        membersData,
        admin,
        image,
        adminName
     }

      const response = await CreateNewgroup_Usecase(dependencies).executeFunction(data)
      console.log(response,'THIS IS IMAGE REsponcee-----');
      if(response.status){
          res.json({status:true , data:response.data})
        } else {
          res.json({ status: false, message: response.message });
        }
     
    };
    return createNewgroupController ;
  };
  