import {Request,Response} from 'express'

export default (dependecies:any)=>{
    const deleteReplayController=async(req:Request,res:Response)=>{

        const {useCase:{deleteReplay_UseCase}}=dependecies


        const {postId,commentId,replayId}=req.body
        const data={
            postId,
            commentId,
            replayId
        }
        const responce=await deleteReplay_UseCase(dependecies).executeFunction(data)
        
        if(responce.status){
            res.status(200).json({status:true,data:responce.data})
        }else{
            res.status(400).json({status:false,message:responce.message})
        }



    }

    return deleteReplayController
} 