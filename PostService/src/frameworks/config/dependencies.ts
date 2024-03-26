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
    deleteReplayRepo,
    savePostRepo,   
    getLikedAndCommentedPost ,
    ChangePostStatus
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
    deleteReplay_UseCase,
    savePost_UseCase,
    getLikedAndCommentedPost_usecase,
    ChangePostStatus_usecase
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
    deleteReplay_UseCase,
    savePost_UseCase,
    getLikedAndCommentedPost_usecase,
    ChangePostStatus_usecase
}
const repositery:any={
    sayHelloRepo,
    createPostRepo,
    getAllPostOfUser,
    getLikedAndCommentedPost,
    showAllPostRepo,
    addLikerepo,
    addComment,
    addReplayToCommentRepo,
    deleteCommentRepo,
    reportPostRepo,
    deletePostRepo,
    updateComment,
    deleteReplayRepo,
    savePostRepo,
    ChangePostStatus
}


export default {
    useCase,repositery
}