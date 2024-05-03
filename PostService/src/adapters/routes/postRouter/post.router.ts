const { check, validationResult } = require('express-validator');
import express from 'express'
import {postController} from '../../controllers'
import { upload } from '../../multer/multerSetUp'
const verifyToken=require ('metamedia_auth')
import {validateComment,validateDeleteComment,validateReportPost,validateDeletePost} from '../../Validation'
import authMiddleware from '../../../Middleware/authMiddleware';
export default (dependencies:any)=> {

    const router = express()
    const {sayHelloController,addPost_controller,searchLocation_controller,changePostStatus_controller,getLatAndLog_controller,getAllpostOfUser_controller,showAllPost_controller,likePost_controller,addComment_controller,addReplayToComment_controller,deleteComment_controller,reportPost_controller,deletePost_controller,updateComment_controller,deleteReplay_controller,savePost_controller,getLikedAndCommentedPost_controller

    } = postController(dependencies)

    router.get('/sayHello', authMiddleware , verifyToken,sayHelloController)
    router.post('/addPost', authMiddleware , upload.array('images',5),addPost_controller)
    router.post('/changePostStatus', authMiddleware , changePostStatus_controller)
    router.post('/searchLocation', authMiddleware , searchLocation_controller)
    router.post('/getLatandLog', authMiddleware , getLatAndLog_controller)
    router.get("/getAllPost",getAllpostOfUser_controller)
    router.get('/showAllPost', authMiddleware , showAllPost_controller)
    // router.get('/showAllPost', authMiddleware , showAllPost_controller)
    router.post('/likePost', authMiddleware , likePost_controller)
    router.post('/addComment', authMiddleware , addComment_controller)
    router.get('/getLikedAndCommentedPost', authMiddleware , getLikedAndCommentedPost_controller)
    router.post('/addReplayToComment', authMiddleware , validateComment,addReplayToComment_controller)
    router.post('/deleteComment', authMiddleware , validateDeleteComment,deleteComment_controller)
    router.post('/reportPost', authMiddleware , validateReportPost,reportPost_controller)
    router.post('/deletePost', authMiddleware , validateDeletePost,deletePost_controller)
    router.post('/updateCommnet', authMiddleware , updateComment_controller)
    router.post('/deleteReplay', authMiddleware , deleteReplay_controller)
    router.post('/savePost', authMiddleware , savePost_controller)
    return router
}