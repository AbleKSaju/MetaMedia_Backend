import express from 'express'
import {profileController, userController} from '../../Controllers'
import { upload } from '../../../Utils/Multer/multer'
import authMiddlewawre from '../../../Utils/Middleware/authMiddleware'

export default (dependencies:any)=>{
    const router=express()
    const {chooseInterestController,getUserDataController,ChangeUserStatusController,followUserController,getSearchUserController,getAllUsersDataController,getAllUserForChatController,getUsersDataByIdController,getUsersByNameController,getUserById_Controller,savePostController,suggetionController,generatevapidKeysController,SubcribeToAwsSNSController,BlockAndUnblockUserController}=userController(dependencies)


    const {addProfileController,editProfileController,addProfileImageController}=profileController(dependencies)

    router.post('/getUserData',getUserDataController)
    router.get('/getAllUsers',getAllUsersDataController)
    router.get('/getSearchUser/:user',authMiddlewawre,getSearchUserController)
    router.post('/addProfile',addProfileController)
    router.post('/editProfile',editProfileController)
    router.post('/chooseInterest',chooseInterestController)
    router.post('/addProfileImage',upload.single("file"),addProfileImageController)
    router.post("/followUser",followUserController)
    router.get("/getAllUsersForChat",getAllUserForChatController)
    router.post('/getUsersByname',getUsersByNameController)
    router.post('/getUserById',getUserById_Controller)
    router.post('/getUsersDataById',getUsersDataByIdController)
    router.post('/changeUserStatus',ChangeUserStatusController)
    router.post('/savePost',savePostController)
    router.get('/suggetions',suggetionController)
    router.post('/BlockAndUnblockUser',BlockAndUnblockUserController)
    router.post("/vapidKeys",generatevapidKeysController)
    router.post("/subscribe",SubcribeToAwsSNSController)

    return router
}