import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema({
   name:{ type: String, required: true },
   members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
   created_at: { type: Date, default: Date.now },
   description: { type: String },
   admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
   profile: { type: String }
});

const GroupChat = mongoose.model('GroupChat', groupSchema);

export{
    GroupChat
} 

