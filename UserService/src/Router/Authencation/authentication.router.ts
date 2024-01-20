import express from 'express'
import {AuthencationController} from '../../libs/controller'
import {validateSignup,validateOtp} from '../../input_validation'

export default (dependencies:any)=> {
    const router=express.Router()

    const {createUserController,verifyOtpController}=AuthencationController(dependencies)

    router.post('/createUser',validateSignup,createUserController)
    router.post('/verifyOtp',validateOtp,verifyOtpController)
    // router.post('/oldPassword',)

    return router

}