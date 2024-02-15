import mongoose, { Types } from "mongoose";

const highLightSchema = new mongoose.Schema({
    userId:String,
    Highlight:{
        name:String,
        media:Array,
    },
    createdAt:{
        type:Date,
        default:Date.now()
      },
    
})

const Post = mongoose.model("Post", highLightSchema);

export {
    Post,
};
