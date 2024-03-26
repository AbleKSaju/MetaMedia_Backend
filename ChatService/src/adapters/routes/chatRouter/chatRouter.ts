import express from 'express'
import { ChatController, } from '../../controllers'
import { upload } from '../../../utils/multer/multer'
export default (dependencies:any)=> {
    const router = express()
    const {Conversation,getConversations,deleteMessageController,message,getMessages,createNewGroupController,getAllGroupOfUserController,singleUserSendFileController,getGroupMessagesController,getGroupDataByIdController,sendgroupMessageController,SendVoiceMessageController,groupSendFileController} = ChatController(dependencies)

    router.post('/conversation',Conversation)
    router.get('/conversations',getConversations)
    router.post('/message',message)
    router.delete('/deleteMessage/:id',deleteMessageController)
    router.get('/getMessages/:conversationId',getMessages)
    router.post('/createNewgroup',upload.single('image'),createNewGroupController)
    router.get("/getAllGroupOfUser",getAllGroupOfUserController)
    router.get("/getSingleGroupMessage",getGroupMessagesController)
    router.get("/getGroupDataById",getGroupDataByIdController)
    router.post('/sendGroupMessage',sendgroupMessageController)
    router.post("/SendVoice_Api",upload.single('audio'),singleUserSendFileController)
    router.post("/groupVoiceMessage",upload.single('audio'),SendVoiceMessageController)
    router.post("/groupSendFile",upload.single('file'),groupSendFileController)
    router.post("/singleUserSendFile",upload.single('file'),singleUserSendFileController)
    return router
}