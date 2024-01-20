import mongoose, { Types } from "mongoose";

const authUserSchema = new mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String, 
});

const authUser = mongoose.model("authUser", authUserSchema);

export {
    authUser,
};
