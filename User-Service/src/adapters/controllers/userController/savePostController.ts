import { Request, Response } from "express"


export default (dependecies:any)=>{

    const {SavePost_Usecase}=dependecies.useCase
    const savePostController=async (req:Request,res:Response)=>{
      
        const {postId,userId}=req.body
        const data={
            postId,
            userId
        }
        const response=await SavePost_Usecase(dependecies).executeFunction(data)
       
        
        if(response.status){
            res.status(200).json({status:true,data:response.data})
        }else{
            res.status(400).json({status:false,message:response.message})
        }
    }
    return savePostController
} 