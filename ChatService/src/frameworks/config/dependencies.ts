
import { chatRepository,NotifaicationRepo } from '../repositories/chatRepository'
import { Conversation_UseCase, getConversations_UseCase,deleteMessage_UseCase, Message_UseCase,singleUserSendFile_Usecase,getMessages_UseCase ,CreateNewgroup_Usecase,GetAllGroupsOfUser_useCase,getGroupMessages_useCase,GetGroupDataById_useCase,SendGroupMessage_UseCase,CallNotification_usecase,CommentNotification_usecase,FollowNotification_usecase,LikeNotification_usecase,MessageNotification_usecase,GetNotificationOfUser_useCase} from '../../applications/usecases'




const useCase:any={
    Conversation_UseCase,
    getConversations_UseCase,
    Message_UseCase,
    getMessages_UseCase,
    CreateNewgroup_Usecase,
    GetAllGroupsOfUser_useCase,
    getGroupMessages_useCase,
    GetGroupDataById_useCase,
    SendGroupMessage_UseCase,
    singleUserSendFile_Usecase,
    deleteMessage_UseCase,
    CallNotification_usecase,
    CommentNotification_usecase,
    FollowNotification_usecase,
    LikeNotification_usecase,
    MessageNotification_usecase,
    GetNotificationOfUser_useCase
}

const repository:any={
  chatRepository,
  NotifaicationRepo
}

export default {
    useCase,
    repository
}