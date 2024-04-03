import userRouter from "./UserRoute/user.router";
import express from 'express'


export const routes=(dependencies:any)=>{
    const router=express()
    router.use('/user',userRouter(dependencies))
    return router
}







