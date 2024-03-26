import { chatRepository } from '../repositories/chatRepository'
import { Conversation_UseCase, getConversations_UseCase,deleteMessage_UseCase, Message_UseCase,singleUserSendFile_Usecase,getMessages_UseCase ,CreateNewgroup_Usecase,GetAllGroupsOfUser_useCase,getGroupMessages_useCase,GetGroupDataById_useCase,SendGroupMessage_UseCase} from '../../applications/usecases'


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
    deleteMessage_UseCase
}

const repository:any={
  chatRepository
}

export default {
    useCase,
    repository
}