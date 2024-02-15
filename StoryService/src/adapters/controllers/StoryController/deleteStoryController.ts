import { Request, Response } from "express"

export default (dependencies:any)=>{
    const {useCase:{DeleteStory_Usecase}}=dependencies
    const DeleteStoryController=async(req:Request,res:Response)=>{
        const {storyId,userId}:any = req.body
        const response = await DeleteStory_Usecase(dependencies).executeFunction(userId,storyId)
        console.log(response,"RES");
        
        if(response){
            res.json({status:response.status , message:response.status , data:response.data})
          } else {
            res.json({ status: false, message: "Deleting Error" });
          }
    }
return DeleteStoryController
}
