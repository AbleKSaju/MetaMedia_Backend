import mongoose, { Types } from "mongoose";

const userSChema = new mongoose.Schema({
   
    name: String,
    email: String,
    password: String,
    profile:String,
    isGoogle:Boolean,
    isFacebook:Boolean
   
});


const User = mongoose.model("User", userSChema);

export {
    User,
};


