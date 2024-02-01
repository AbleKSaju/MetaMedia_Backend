import express from 'express'
import {AddProfileController, AuthencationController} from '../../libs/controller'
import {validateSignup,validateOtp,validateLogin,validateGoogleLogin} from '../../input_validation'

export default (dependencies:any)=> {
    const router=express()

    const {createUserController,verifyOtpController,chooseInterestController,logoutUserController,verifyPasswordController,loginWithGoogleController,loginWithFacebookController,changePasswordController,forgotPasswordController,loginUserController,refreshTokenController,imageController}=AuthencationController(dependencies)

    const {addProfileController} =AddProfileController(dependencies)

    // const {addProfileController} =AddProfileController(dependencies)

    router.post('/signup',validateSignup,createUserController)
    router.post('/verifyOtp',verifyOtpController)
    router.post('/oldPassword',verifyPasswordController)
    router.post('/forgotPassword',forgotPasswordController)
    router.post('/changePassword',changePasswordController)

    router.post('/loginWithGoogle',loginWithGoogleController)
    router.post('/chooseInterest',chooseInterestController)

    router.post('/addProfile',addProfileController)
    router.post('/login',validateLogin,loginUserController)
    router.get('/logout',logoutUserController)
    router.post('/loginWithFaceBook',loginWithFacebookController)
    router.get('/refresh',refreshTokenController)
    router.get('/img',imageController)

    return router
}