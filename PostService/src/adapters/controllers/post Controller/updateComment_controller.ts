import {Request,Response} from 'express'

export default (dependecies:any)=>{
    const updateCommnetController=async(req:Request,res:Response)=>{

        const {useCase:{updateComment_useCase}}=dependecies

        const {postId,commentId,comment}=req.body
        const data={
            postId,
            commentId,
            comment
        }
        const responce=await updateComment_useCase(dependecies).executeFunction(data)
        
        if(responce.status){
            res.status(200).json({status:true,data:responce.data})
        }else{
            res.status(400).json({status:false})
        }



    }

    return updateCommnetController
} 