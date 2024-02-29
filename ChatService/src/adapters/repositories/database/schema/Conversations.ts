import mongoose from 'mongoose'

const conversationSchema = new mongoose.Schema({
    members: {
        type: Array,
        required: true,
    }
});

const Conversation = mongoose.model('conversation', conversationSchema);

export{
    Conversation
} 

