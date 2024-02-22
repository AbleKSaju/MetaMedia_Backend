import {Request,Response} from 'express'

export default (dependecies:any)=>{
    const showAllPostController=async(req:Request,res:Response)=>{

        const {useCase:{showAllPost_useCase}}=dependecies
        const responce=await showAllPost_useCase(dependecies).executeFunction()
        
        if(responce.status){
            res.status(200).json({status:true,data:responce.data})
        }else{
            res.status(400).json({status:false})
        }



    }

    return showAllPostController
} 