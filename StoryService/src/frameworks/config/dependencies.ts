import { storyRepository,highlightRepository } from '../../adapters/repositories'
import { AddStory_useCase,GetHighlightData_Usecase,DeleteStory_Usecase,addNewHighlight_Usecase,getStories_Usecase } from '../../applications/usecases'


const useCase:any={
    AddStory_useCase,
    DeleteStory_Usecase,
    GetHighlightData_Usecase,
    addNewHighlight_Usecase,
    getStories_Usecase

}

// const consumeUsecase:any={
//     createUserUsecase
// }

const repository:any={
    storyRepository,
    highlightRepository
}

export default {
    useCase,
    repository
}