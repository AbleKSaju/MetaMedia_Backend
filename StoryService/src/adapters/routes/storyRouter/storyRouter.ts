
import express from 'express'
import { upload } from '../../../Utils/Multer/multer'
import storyController from '../../Controllers/StoryController'
import authMiddlewawre from '../../../Utils/Middleware/authMiddleware'
export default (dependencies:any)=> {
    const router = express()
    const {AddStoryController,DeleteStoryController,getSignatureController,getTheNumberOfStoriesController,AddVideoController,getStoriesController,getAllStoriesController,GetMyAllStoriesForHighLighController} = storyController(dependencies)

    router.post('/addStory',upload.single("image"),authMiddlewawre,AddStoryController)
    
    router.post('/addVideos',authMiddlewawre,AddVideoController)
    
    router.post('/getSignature',authMiddlewawre,getSignatureController)

    router.get('/getStories',authMiddlewawre,getStoriesController)

    router.get('/getAllStories',authMiddlewawre,getAllStoriesController)

    router.post('/deleteStory',authMiddlewawre,DeleteStoryController)

    router.get('/getMyAllStoriesForHighLigh',authMiddlewawre,GetMyAllStoriesForHighLighController)

    router.get('/getTheNumberOfStories',authMiddlewawre,getTheNumberOfStoriesController)

    return router
}