import Conversation from "./Conversation";
import getConversations from "./getConversations";
import getMessages from "./getMessagesController";
import message from "./message";
import createNewGroupController from "./createNewGroupController";
import getAllGroupOfUserController from "./getAllGroupOfUserController";
import getGroupMessagesController from "./getGroupMessagesController";
import getGroupDataByIdController from "./getGroupDataByIdController";
import sendgroupMessageController from "./sendgroupMessageController";
import SendVoiceMessageController from "./SendVoiceMessageController";
import groupSendFileController from "./groupSendFileController";
import singleUserSendFileController from "./singleUserSendFileController";
import deleteMessageController from "./deleteMessageController";
import GetNotificationOfAUserController from "./GetNotificationOfAUserController";
export default (dependencies:any)=>{
    return{
        Conversation:Conversation(dependencies),
        getConversations:getConversations(dependencies),
        message:message(dependencies),
        getMessages:getMessages(dependencies),
        createNewGroupController:createNewGroupController(dependencies),
        getAllGroupOfUserController:getAllGroupOfUserController(dependencies),
        getGroupMessagesController:getGroupMessagesController(dependencies),
        getGroupDataByIdController:getGroupDataByIdController(dependencies),
        sendgroupMessageController:sendgroupMessageController(dependencies),
        SendVoiceMessageController:SendVoiceMessageController(dependencies),
        groupSendFileController:groupSendFileController(dependencies),
        singleUserSendFileController:singleUserSendFileController(dependencies),
        deleteMessageController:deleteMessageController(dependencies),
        GetNotificationOfAUserController:GetNotificationOfAUserController(dependencies)
    }
}