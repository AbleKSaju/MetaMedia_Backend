import mongoose, { Types } from "mongoose";
const highLightSchema = new mongoose.Schema({
    userId: String,
    highlights: [{
        name: String,
        media: [String],
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Highlight = mongoose.model("highlight", highLightSchema);

export {Highlight};
