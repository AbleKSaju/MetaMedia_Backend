import mongoose, { Types } from "mongoose";

const authUserSchema = new mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    profile:String,
    password: String, 
    isGoogle:Boolean,
    isFacebook:Boolean
});

const authUser = mongoose.model("authUser", authUserSchema);

export {
    authUser,
};
