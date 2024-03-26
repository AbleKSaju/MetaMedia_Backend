import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: String,
    },
    senderId: {
        type: String
    },
    message: {
        type: String
    },
    messageType: {
        type: String
    },
    createdAt:{
        type:Date,
        default:Date.now()
      }
});

const Messages = mongoose.model('message', messageSchema);

export{
    Messages
} 