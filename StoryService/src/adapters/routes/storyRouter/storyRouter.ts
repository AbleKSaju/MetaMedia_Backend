
import express from 'express'
import { upload } from '../../../utils/multer/multer'
import {storyController} from '../../controllers'
export default (dependencies:any)=> {
    const router = express()
    const {AddStoryController,DeleteStoryController,getSignatureController,AddVideoController,getStoriesController,getAllStoriesController,GetMyAllStoriesForHighLighController} = storyController(dependencies)

    router.post('/addStory',upload.single("image"),AddStoryController)
    
    router.post('/addVideos',AddVideoController)
    
    router.post('/getSignature',getSignatureController)

    router.get('/getStories',getStoriesController)

    router.get('/getAllStories',getAllStoriesController)

    router.post('/deleteStory',DeleteStoryController)

    router.get('/getMyAllStoriesForHighLigh',GetMyAllStoriesForHighLighController)

    return router
}