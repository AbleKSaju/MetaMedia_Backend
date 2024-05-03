import { Request, Response } from "express";

export default (dependencies:any)=>{
    const {useCase: { GetHighlightData_Usecase } } = dependencies
    const GetHighlightsController = async(req:Request,res:Response)=>{
        const {id} = req.params
        console.log(id,"idididid");
        
        if (id) {
            const response = await GetHighlightData_Usecase(dependencies).executeFunction(id)
                if(response){
                    res.json({status:response.status , message:response.message , data:response.data})
                  }
            } else {
                res.json({ status: false, message: "User not found" });
              }   
        }
    return GetHighlightsController
}