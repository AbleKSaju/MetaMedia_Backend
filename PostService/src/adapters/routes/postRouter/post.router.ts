const { check, validationResult } = require('express-validator');
import express from 'express'
import {postController} from '../../controllers'
import { upload } from '../../multer/multerSetUp'
const verifyToken=require ('metamedia_auth')
import {validateComment,validateDeleteComment,validateReportPost,validateDeletePost} from '../../validation'
export default (dependencies:any)=> {

    const router = express()
    const {
        sayHelloController,
        addPost_controller,
        searchLocation_controller,
        getLatAndLog_controller,
        getAllpostOfUser_controller,
        showAllPost_controller,
        likePost_controller,
        addComment_controller,
        addReplayToComment_controller,
        deleteComment_controller,
        reportPost_controller,
        deletePost_controller
    } = postController(dependencies)

    router.get('/sayHello',verifyToken,sayHelloController)
    router.post('/addPost',upload.array('images',5),addPost_controller)
    router.post('/searchLocation',searchLocation_controller)
    router.post('/getLatandLog',getLatAndLog_controller)
    router.get("/getAllPost",getAllpostOfUser_controller)
    router.get('/showAllPost',showAllPost_controller)
    router.post('/likePost',likePost_controller)
    router.post('/addComment',addComment_controller)
    router.post('/addReplayToComment',validateComment,addReplayToComment_controller)
    router.post('/deleteComment',validateDeleteComment,deleteComment_controller)
    router.post('/reportPost',validateReportPost,reportPost_controller)
    router.post('/deletePost',validateDeletePost,deletePost_controller)
    //replay delete
    //save post 
    return router
}