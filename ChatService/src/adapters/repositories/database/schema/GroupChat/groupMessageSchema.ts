import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String },
    type: { type: String, enum: ['text', 'image', 'video', 'voice_note', 'file'], required: true },
    timestamp: { type: Date, default: Date.now },
    metadata: { type: Object }
});

const GroupMessage= mongoose.model('GroupMessage',messageSchema)

export {
    GroupMessage
}