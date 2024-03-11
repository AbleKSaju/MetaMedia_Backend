import { Request,Response } from "express"

export default (dependencies:any)=>{
    const savePostController=async(req:Request,res:Response)=>{

        const {savePost_UseCase}=dependencies.useCase
       
        const {userId,postId}=req.body
        const data={
            userId,
            postId
        }

        const responce=await savePost_UseCase(dependencies).executeFunction(data)

        if(responce.status){
          return   res.status(200).json({status:true,data:responce.data})
        }else{
          return  res.status(400).json({status:false,message:responce.message})
        }

    }
    return savePostController
}