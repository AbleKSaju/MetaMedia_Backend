import {Request,Response} from 'express'
import { postProducer } from '../../../Events/kafkaProducer'

export default (dependecies:any)=>{

    const {likePost_UseCase}=dependecies.useCase
    const likePostController=async(req:Request,res:Response)=>{
      const {postId,userId} =req.body
      const data={
        postId,
        userId
      }

       const responce= await likePost_UseCase(dependecies).executeFunction(data)
       if(responce.status){
        const data={
          sender_id:userId,
          receiver_id:responce.data.userId,
          notificationType:"like",
          postId:responce.data._id,
          postImage:responce.data.mediaUrl[0]
        }
        await postProducer(data,'Notification',"likePostNotification")
        res.status(200).json({status:true,data:responce.data})
       }else{
        res.status(400).json({status:false})
       }
    }

    return likePostController
} 