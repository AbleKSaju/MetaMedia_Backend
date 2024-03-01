import express from 'express'
import { ChatController, } from '../../controllers'
export default (dependencies:any)=> {
    const router = express()
    const {Conversation,getConversations,message,getMessages} = ChatController(dependencies)

    router.post('/conversation',Conversation)
    router.get('/conversations',getConversations)
    router.post('/message',message)
    router.get('/getMessages/:conversationId',getMessages)

    return router
}