import { chatRepository } from '../repositories'
import { Conversation_UseCase, getConversations_UseCase, Message_UseCase,getMessages_UseCase } from '../../applications/usecases'

const useCase:any={
    Conversation_UseCase,
    getConversations_UseCase,
    Message_UseCase,
    getMessages_UseCase
}

const repository:any={
  chatRepository
}

export default {
    useCase,
    repository
}