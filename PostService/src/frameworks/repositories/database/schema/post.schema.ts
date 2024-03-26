import mongoose, { Schema } from 'mongoose'
//for comment schema
const CommentSchema:Schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String,
    replay:[{
        userId:mongoose.Schema.Types.ObjectId,
        content:String,
        createdAt:Date
    }],
    userName: String,
    profile: String,

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const PostSchema=new mongoose.Schema({
    userId:String,
    description:String,

    mediaUrl:[],
   
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    comments:[CommentSchema],
    shareCount:Number,
    tags:[],
    location: {
        latitude: Number,
        longitude: Number,
        name:String
    },
    reports:[{
        userId:mongoose.Schema.Types.ObjectId,
        content:String
    }],
    postCropSize:String,
    postType:{
        type:String,
        enum:['image','video']
    },
    showComment:Boolean,
    showLikes:Boolean,
    saved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }], 
    createdAt:{
        type:Date,
        default:Date.now
    },
    isDelete:{
        type:Boolean,
        default:false
    },
    blocked:{
        type:Boolean,
        default: false
    }
},{timestamps:true})


export const Post = mongoose.model("Post",PostSchema)
