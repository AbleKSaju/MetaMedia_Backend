import { storyRepository } from '../../adapters/repositories'
import { AddStory_useCase,getUserData_Usecase, chooseInterest_Usecase,DeleteStory_Usecase } from '../../applications/usecases'


const useCase:any={
    AddStory_useCase,
    getUserData_Usecase,
    DeleteStory_Usecase

}

// const consumeUsecase:any={
//     createUserUsecase
// }

const repository:any={
    storyRepository
}

export default {
    useCase,
    repository
}