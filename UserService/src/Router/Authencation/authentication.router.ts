import express from 'express'


import {AuthencationController} from '../../libs/controller'

export default (dependencies:any)=> {
    const router=express.Router()

    const {createUserController,verifyOtpController}=AuthencationController(dependencies)

    router.post('/createUser',createUserController)
    router.post('/verifyOtp',verifyOtpController)

    return router

}