import {Request,Response} from 'express'

export default (dependecies:any)=>{
    const showAllPostController=async(req:Request,res:Response)=>{
        // const {page,size}:any=req.query
        const {useCase:{showAllPost_useCase}}=dependecies
        const response=await showAllPost_useCase(dependecies).executeFunction()
        if(response.status){
            res.status(200).json({status:true,data:response.data,total:response.total})
        }else{
            res.status(400).json({status:false})
        }
    }
    return showAllPostController
} 