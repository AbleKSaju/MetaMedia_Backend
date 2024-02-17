
import express from 'express'
import { upload } from '../../../utils/multer/multer'
import {storyController} from '../../controllers'
export default (dependencies:any)=> {
    const router = express()
    const {AddStoryController,DeleteStoryController,getStoriesController} = storyController(dependencies)

    router.post('/addStory',upload.single("image"),AddStoryController)
    router.get('/getStories',getStoriesController)
    router.post('/deleteStory',DeleteStoryController)

    return router
}