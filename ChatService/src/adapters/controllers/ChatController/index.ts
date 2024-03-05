import Conversation from "./conversation";
import getConversations from "./getConversations";
import getMessages from "./getMessagesController";
import message from "./message";


export default (dependencies:any)=>{

    return{
        Conversation:Conversation(dependencies),
        getConversations:getConversations(dependencies),
        message:message(dependencies),
        getMessages:getMessages(dependencies),
    }
}