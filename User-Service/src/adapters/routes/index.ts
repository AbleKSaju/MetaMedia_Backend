import userRouter from "./userRoute/user.router";
import express from 'express'


export const routes=(dependencies:any)=>{
    const router=express()
<<<<<<< HEAD
    router.use('/user',authRouter(dependencies))
  
=======
    router.use('/user',userRouter(dependencies))

>>>>>>> rashik
    return router
}







