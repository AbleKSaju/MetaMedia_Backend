import mongoose from 'mongoose'

const conversationSchema = new mongoose.Schema({
    members: {
        type: Array,
        required: true,
    },
    lastUpdate: {
        type: Date,
        default:Date.now()
    }
});

const Conversation = mongoose.model('conversation', conversationSchema);

export{
    Conversation
} 

