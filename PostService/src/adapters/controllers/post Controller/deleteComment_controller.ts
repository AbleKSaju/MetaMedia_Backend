import {Request,Response} from 'express'
import { validateDeleteComment } from '../../Validation';
const { check, validationResult } = require('express-validator');
export default (dependecies:any)=>{
    const deleteCommentController=async(req:Request,res:Response)=>{

        const {useCase:{deleteComment_UseCase}}=dependecies
         const {postId,commentId}=req.body

         const errors = validationResult(req);
         if (!errors.isEmpty()) {
           return res.json({status:false, message:"validation error", errors: errors.array() });
         }
         const data={postId,commentId}

         const responce=await deleteComment_UseCase(dependecies).executeFunction(data)

         if(responce.status){
            res.status(200).json({status:true,data:responce.data})
         }else{
            res.json(400).json({status:false,message:responce.message})
         }



    }

    return deleteCommentController
} 