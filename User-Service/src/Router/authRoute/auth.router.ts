import express from 'express'
import {authController,profileController} from '../../libs/controllers'
import {validateLogin} from '../../input_validation'


export default (dependencies:any)=>{
    const router=express()

    const {loginUserController,}=authController(dependencies)
    const {addProfileController,}=profileController(dependencies)


    router.post('/login',validateLogin,loginUserController)
    router.post('/addProfile',addProfileController)

   router.post('/user/')
    return router
}