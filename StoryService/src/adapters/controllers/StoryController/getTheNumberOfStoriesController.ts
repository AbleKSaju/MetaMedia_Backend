import {Request,Response} from 'express'

export default (dependencies:any)=>{
    const {useCase:{getTheNumberOfStories_Usecase}}=dependencies
    const getTheNumberOfStoriesController=async(req:Request,res:Response)=>{
        const response=await getTheNumberOfStories_Usecase(dependencies).executeFunction()
        if(response){
            res.json({status:response.status , message:response.message , data:response.data})
          }else {
            res.json({ status: false, message: "Stories not found" , data:false });
    }
}
    return getTheNumberOfStoriesController
}