import { chatRepository,NotifaicationRepo } from '../../adapters/repositories'
import { Conversation_UseCase, getConversations_UseCase, Message_UseCase,getMessages_UseCase ,CreateNewgroup_Usecase,GetAllGroupsOfUser_useCase,getGroupMessages_useCase,GetGroupDataById_useCase,SendGroupMessage_UseCase} from '../../applications/usecases'

const useCase:any={
    Conversation_UseCase,
    getConversations_UseCase,
    Message_UseCase,
    getMessages_UseCase,
    CreateNewgroup_Usecase,
    GetAllGroupsOfUser_useCase,
    getGroupMessages_useCase,
    GetGroupDataById_useCase,
    SendGroupMessage_UseCase
}

const repository:any={
  chatRepository,
  NotifaicationRepo
}

export default {
    useCase,
    repository
}