import express from 'express'
import { ChatController, } from '../../controllers'
import { upload } from '../../../utils/multer/multer'
export default (dependencies:any)=> {
    const router = express()
    const {Conversation,getConversations,message,getMessages,createNewGroupController,getAllGroupOfUserController,getGroupMessagesController,getGroupDataByIdController,sendgroupMessageController,SendVoiceMessageController,groupSendFileController} = ChatController(dependencies)

    router.post('/conversation',Conversation)
    router.get('/conversations',getConversations)
    router.post('/message',message)
    router.get('/getMessages/:conversationId',getMessages)
    router.post('/createNewgroup',upload.single('image'),createNewGroupController)
    router.get("/getAllGroupOfUser",getAllGroupOfUserController)
    router.get("/getSingleGroupMessage",getGroupMessagesController)
    router.get("/getGroupDataById",getGroupDataByIdController)
    router.post('/sendGroupMessage',sendgroupMessageController)
    router.post("/groupVoiceMessage",upload.single('audio'),SendVoiceMessageController)
    router.post("/groupSendFile",upload.single('file'),groupSendFileController)
    return router
}