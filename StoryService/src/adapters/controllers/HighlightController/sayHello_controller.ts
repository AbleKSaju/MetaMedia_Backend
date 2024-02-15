import {Request,Response} from 'express'

export default (dependecies:any)=>{
    const sayHelloController=async(req:Request,res:Response)=>{

        const {useCase:{sayHello_usecase}}=dependecies
        const responce=await sayHello_usecase(dependecies).executeFunction()
        
        res.send(responce)



    }

    return sayHelloController
}