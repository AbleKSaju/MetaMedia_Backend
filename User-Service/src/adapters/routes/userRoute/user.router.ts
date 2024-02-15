import express from 'express'
import {profileController, userController} from '../../controllers'
import { upload } from '../../../utils/multer/multer'

export default (dependencies:any)=>{
    const router=express()

    const {chooseInterestController,getUserDataController}=userController(dependencies)
    const {addProfileController,editProfileController,addProfileImageController}=profileController(dependencies)

    router.post('/getUserData',getUserDataController)
    router.post('/addProfile',addProfileController)
    router.post('/editProfile',editProfileController)
    router.post('/chooseInterest',chooseInterestController)
    router.post('/addProfileImage',upload.single("file"),addProfileImageController)

   
    return router
}