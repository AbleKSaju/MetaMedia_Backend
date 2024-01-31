import express from 'express'
import {authController} from '../../libs/controllers'
import {validateLogin} from '../../input_validation'


export default (dependencies:any)=>{
    const router=express()

    const {loginUserController}=authController(dependencies)


    router.post('/login',validateLogin,loginUserController)
   
    return router
}