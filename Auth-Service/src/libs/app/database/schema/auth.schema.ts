import mongoose, { Types } from "mongoose";

const authSchema = new mongoose.Schema({
   basicInformation:{
    userName:String,
    fullName:String,
    email:String,
    password:String,
    phoneNumber:Number,
    dateOfBirth:Date,
    isAdmin:{
      type:Boolean,
      default:false
    },
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
    isFacebook:Boolean,
    blocked: {
      type: Boolean,
      default: false
    }
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
})

const Auth = mongoose.model("User", authSchema);

export {
    Auth,
};



