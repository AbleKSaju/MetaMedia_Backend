import {
    sayHelloRepo,
    createPostRepo,
    getAllPostOfUser,
    showAllPostRepo,
    addLikerepo,
    addComment,
    addReplayToCommentRepo,
    deleteCommentRepo,
    reportPostRepo,
    deletePostRepo,
    updateComment,
    deleteReplayRepo
    
} from '../repositories'

import {
    sayHello_usecase,
    addPostUseCase,
    searchLocation_useCase,
    getLatAndLog_useCase,
    getAllPostOfUser_useCase,
    showAllPost_useCase,
    likePost_UseCase,
    addComment_UseCase,
    addReplayToComment_UseCase,
    deleteComment_UseCase,
    reportPost_UseCase,
    deletePost_UseCase,
    updateComment_useCase,
    deleteReplay_UseCase
} from '../../applications/useCases'



const useCase:any={
    sayHello_usecase,
    addPostUseCase,
    searchLocation_useCase,
    getLatAndLog_useCase,
    getAllPostOfUser_useCase,
    showAllPost_useCase,
    likePost_UseCase,
    addComment_UseCase,
    addReplayToComment_UseCase,
    deleteComment_UseCase,
    reportPost_UseCase,
    deletePost_UseCase,
    updateComment_useCase,
    deleteReplay_UseCase
}
const repositery:any={
    sayHelloRepo,
    createPostRepo,
    getAllPostOfUser,
    showAllPostRepo,
    addLikerepo,
    addComment,
    addReplayToCommentRepo,
    deleteCommentRepo,
    reportPostRepo,
    deletePostRepo,
    updateComment,
    deleteReplayRepo
}


export default {
    useCase,repositery
}