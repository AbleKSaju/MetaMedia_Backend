import express from 'express'
import {AuthencationController,AddProfileController} from '../../libs/controller'
import {validateSignup,validateOtp,validateLogin} from '../../input_validation'

export default (dependencies:any)=> {
    const router=express()


    const {createUserController,verifyOtpController,verifyPasswordController,loginWithGoogleController,changePasswordController,forgotPasswordController,loginUserController}=AuthencationController(dependencies)
    const {addProfileController} =AddProfileController(dependencies)




    router.post('/signup',validateSignup,createUserController)
    router.post('/verifyOtp',validateOtp,verifyOtpController)
    router.post('/oldPassword',verifyPasswordController)
    router.post('/forgotPassword',forgotPasswordController)
    router.post('/changePassword',changePasswordController)
    router.post('/loginWithGoogle',loginWithGoogleController)

    router.post('/addProfile',addProfileController)
    router.post('/login',validateLogin,loginUserController)
    router.post('/loginWithfaceBook',)

    return router
}