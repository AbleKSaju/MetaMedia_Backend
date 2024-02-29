import {Request,Response} from 'express'

export default (dependecies:any)=>{

    const {searchLocation_useCase}=dependecies.useCase
    const searchLocationController=async(req:Request,res:Response)=>{

       
       
       const responceFromUseCase=await searchLocation_useCase(dependecies).executeFunction(req.body)
       
       

       if(responceFromUseCase.length > 0){
        const sugetionNames:string[]=[]
        responceFromUseCase.map((item:any)=>{
         const nameofLocation=item
         sugetionNames.push(nameofLocation)
 
        })
        
         res.send(sugetionNames)
       }else{
          res.send([])
       }

       




    }

    return searchLocationController
} 