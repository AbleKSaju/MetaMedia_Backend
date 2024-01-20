import mongoose, { Types } from "mongoose";

const userSChema = new mongoose.Schema({
   
    name: String,
    email: String,
    password: String,
  
   
});

const User = mongoose.model("User", userSChema);

export {
    User,
};
