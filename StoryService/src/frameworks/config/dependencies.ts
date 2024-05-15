import { storyRepository,highlightRepository } from '../../Adapters/Repositories'
import { AddStory_useCase,GetHighlightData_Usecase,getTheNumberOfStories_Usecase,DeleteStory_Usecase,addNewHighlight_Usecase,getStories_Usecase,DeleteHighlight_Usecase,getAllStories_Usecase,getMyAllStoriesForHighlight_Usecase } from '../../Applications/Usecases'


const useCase:any={
    AddStory_useCase,
    DeleteStory_Usecase,
    GetHighlightData_Usecase,
    addNewHighlight_Usecase,
    getStories_Usecase,
    DeleteHighlight_Usecase,
    getAllStories_Usecase,
    getMyAllStoriesForHighlight_Usecase,
    getTheNumberOfStories_Usecase
}


const repository:any={
    storyRepository,
    highlightRepository
}

export default {
    useCase,
    repository
}