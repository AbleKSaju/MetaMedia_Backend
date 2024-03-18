import mongoose from "mongoose";
const attachmentSchema = new mongoose.Schema({
    message_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', required: true },
    type: { type: String, enum: ['image', 'video', 'file'], required: true },
    url: { type: String, required: true },
    filename: { type: String },
    size: { type: Number }
});


const Attachment = mongoose.model('Attachment', attachmentSchema);

export {
    Attachment
}