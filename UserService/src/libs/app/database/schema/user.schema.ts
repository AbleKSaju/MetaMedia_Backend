import mongoose, { Types } from "mongoose";

const userSChema = new mongoose.Schema({
   basicInformation:{
    userName:String,
    fullName:String,
    email:String,
    password:String,
    phoneNumber:Number,
    dateOfBirth:Date,
    gender: {
        type: String,
        enum: ['male', 'female'],
     },
    accountStatus:{
        type:String,
        enum:['login','logout','banned']
    },
    lastLogin:Date,
    isGoogle:Boolean,
    isFacebook:Boolean
   },

   profile:{
      profileUrl:String,
      bio:String,
      location: {
        type: {
           type: String,
           enum: ['Point'],
           default: 'Point',
        },
        coordinates: {
           type: [Number],
           default: [0, 0], 
        },
      },
      interests:Array<string>,
      privacy:{
        type:String,
        enum:['privet','public']
      },
      lastSeen:Date,
      status:{
        type:String,
        enum:['online','offline']
      }
},

socialConections:{
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
     }],
     followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
     }],
     blockedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
     }],
     groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group', 
     }],
},

acivity:{
    posts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
     },
     likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', 
     }],
     comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
     }],
     shares: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', 
     }],
     highlight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story', 
     },
     saved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', 
     }],   
}
   
});
const groupSchema = new mongoose.Schema({
    name: String,
    description: String,
    groupMembers: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User', 
    }],
    blockedUsers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
     }],
     userRole:[{
        type:String,
        enum:['admin','user']
     }]
 });

const User = mongoose.model("User", userSChema);

export {
    User,
};




