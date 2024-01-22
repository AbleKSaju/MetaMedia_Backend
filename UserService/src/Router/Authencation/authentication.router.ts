import express from 'express'
import {AuthencationController} from '../../libs/controller'
import {validateSignup,validateOtp} from '../../input_validation'

export default (dependencies:any)=> {
    const router=express()
    const {createUserController,verifyOtpController,verifyPasswordController}=AuthencationController(dependencies)

    router.post('/signup',createUserController)
    router.post('/verifyOtp',validateOtp,verifyOtpController)
    router.post('/oldPassword',verifyPasswordController)

    return router

}