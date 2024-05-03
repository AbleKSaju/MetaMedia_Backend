import express from 'express'
import { ChatController, } from '../../controllers'
import { upload } from '../../../Utils/multer/multer'
import authMiddleware from '../../../Utils/Middleware/authMiddleware'
export default (dependencies:any)=> {
    const router = express()
    const {Conversation,getConversations,deleteMessageController,message,getMessages,createNewGroupController,getAllGroupOfUserController,singleUserSendFileController,getGroupMessagesController,getGroupDataByIdController,sendgroupMessageController,SendVoiceMessageController,groupSendFileController,GetNotificationOfAUserController} = ChatController(dependencies)

    router.post('/conversation' , authMiddleware , Conversation)
    router.get('/conversations' , authMiddleware , getConversations)
    router.post('/message' , authMiddleware , message)
    router.delete('/deleteMessage/:id', authMiddleware , deleteMessageController)
    router.get('/getMessages/:conversationId', authMiddleware , getMessages)
    router.post('/createNewgroup' , authMiddleware , upload.single('image'),createNewGroupController)
    router.get("/getAllGroupOfUser" , authMiddleware , getAllGroupOfUserController)
    router.get("/getSingleGroupMessage" , authMiddleware , getGroupMessagesController)
    router.get("/getGroupDataById" , authMiddleware , getGroupDataByIdController)
    router.post('/sendGroupMessage' , authMiddleware , sendgroupMessageController)
    router.post("/SendVoice_Api" , authMiddleware , upload.single('audio'),singleUserSendFileController)
    router.post("/groupVoiceMessage" , authMiddleware , upload.single('audio'),SendVoiceMessageController)
    router.post("/groupSendFile" , authMiddleware , upload.single('file'),groupSendFileController)
    router.post("/singleUserSendFile" , authMiddleware , upload.single('file'),singleUserSendFileController)
    router.get("/getNoficationOfAUser" , authMiddleware , GetNotificationOfAUserController)
    return router
}