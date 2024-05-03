import express from 'express'
import {profileController, userController} from '../../Controllers'
import { upload } from '../../../Utils/Multer/multer'
import authMiddlewawre from '../../../Utils/Middleware/authMiddleware'

export default (dependencies:any)=>{
    const router=express()
    const {chooseInterestController,getUserDataController,ChangeUserStatusController,followUserController,getSearchUserController,getAllUsersDataController,getAllUserForChatController,getUsersDataByIdController,getUsersByNameController,getUserById_Controller,savePostController,suggetionController,generatevapidKeysController,SubcribeToAwsSNSController,BlockAndUnblockUserController}=userController(dependencies)
    const {addProfileController,editProfileController,addProfileImageController}=profileController(dependencies)

    router.post('/getUserData' , authMiddlewawre , getUserDataController)
    router.get('/getAllUsers' , authMiddlewawre , getAllUsersDataController)
    router.get('/getSearchUser/:user' , authMiddlewawre , getSearchUserController)
    router.post('/addProfile' , authMiddlewawre , addProfileController)
    router.post('/editProfile' , authMiddlewawre , editProfileController)
    router.post('/chooseInterest' , authMiddlewawre , chooseInterestController)
    router.post('/addProfileImage' , upload.single("file") , authMiddlewawre , addProfileImageController)
    router.post("/followUser" , authMiddlewawre , followUserController)
    router.get("/getAllUsersForChat" , authMiddlewawre , getAllUserForChatController)
    router.post('/getUsersByname' , authMiddlewawre , getUsersByNameController)
    router.post('/getUserById' , authMiddlewawre , getUserById_Controller)
    router.post('/getUsersDataById' , authMiddlewawre , getUsersDataByIdController)
    router.post('/changeUserStatus' , authMiddlewawre , ChangeUserStatusController)
    router.post('/savePost' , authMiddlewawre , savePostController)
    router.get('/suggetions' , authMiddlewawre , suggetionController)
    router.post('/BlockAndUnblockUser' , authMiddlewawre , BlockAndUnblockUserController)
    router.post("/vapidKeys" , authMiddlewawre , generatevapidKeysController)
    router.post("/subscribe" , authMiddlewawre , SubcribeToAwsSNSController)

    return router
}