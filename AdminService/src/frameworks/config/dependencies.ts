import { storyRepository,AdminRepository } from '../../adapters/repositories'
import { AddStory_useCase,GetHighlightData_Usecase,DeleteStory_Usecase,addNewHighlight_Usecase,getStories_Usecase,DeleteHighlight_Usecase,getAllStories_Usecase,getMyAllStoriesForHighlight_Usecase } from '../../applications/usecases'


const useCase:any={
    AddStory_useCase,
    DeleteStory_Usecase,
    GetHighlightData_Usecase,
    addNewHighlight_Usecase,
    getStories_Usecase,
    DeleteHighlight_Usecase,
    getAllStories_Usecase,
    getMyAllStoriesForHighlight_Usecase
}

// const consumeUsecase:any={
//     createUserUsecase
// }

const repository:any={
    storyRepository,
    AdminRepository
}

export default {
    useCase,
    repository
}