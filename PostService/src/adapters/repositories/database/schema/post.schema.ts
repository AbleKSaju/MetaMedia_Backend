import mongoose, { Schema } from 'mongoose'

const CommentSchema:Schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String,
    replay:[{
        userId:mongoose.Schema.Types.ObjectId,
        content:String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const PostSchema=new mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
    description:String,
    mediaUrl:String,
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    comments:[CommentSchema],
    shareCount:Number,
    tags:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    location: {
        latitude: Number,
        longitude: Number,
        status:Boolean
    },
    reports:[{
        userId:mongoose.Schema.Types.ObjectId,
        content:String
    }],
    postCropSize:String,
    postType:{
        type:String,
        enum:['image','vedio']
    },
    showComment:Boolean,
    showLikes:Boolean,
    createdAt:{
        type:Date,
        default:Date.now()
    }


},{timestamps:true})


const Post =mongoose.model("Post",PostSchema)
 export {
    Post
 }