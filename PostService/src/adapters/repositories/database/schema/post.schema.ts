import mongoose, { Schema } from 'mongoose'

const CommentSchema:Schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String,
    replay:[{
        userId:mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
        content:String,
        createdAt:Date
=======
        content:String
>>>>>>> 78355af4cc1dd2379277071fab886db01dfe6c8b
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const PostSchema=new mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
    description:String,
<<<<<<< HEAD
    mediaUrl:[],
=======
    mediaUrl:String,
>>>>>>> 78355af4cc1dd2379277071fab886db01dfe6c8b
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
<<<<<<< HEAD
        name:String
    },
    reports:[{
        userId:mongoose.Schema.Types.ObjectId,
        content:String,

=======
        status:Boolean
    },
    reports:[{
        userId:mongoose.Schema.Types.ObjectId,
        content:String
>>>>>>> 78355af4cc1dd2379277071fab886db01dfe6c8b
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
<<<<<<< HEAD
    },
    isDelete:{
        type:Boolean,
        default:false
=======
>>>>>>> 78355af4cc1dd2379277071fab886db01dfe6c8b
    }


},{timestamps:true})


const Post =mongoose.model("Post",PostSchema)
 export {
    Post
 }