import mongoose, { Types } from "mongoose";

const storySchema = new mongoose.Schema({
    userId: {
      type: String,
    },
    content: {
      story: [
        {
          caption: {
            type: String,
            require: true
          },
          type: {
            type: String,
            require: true
          },
          storyUrl: {
            type: String,
            require: true
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
          expiredAt: {
            type: Date,
            default: function () {
              return Date.now() + 12 * 60 * 60 * 1000;
            },
          },
        },
      ],
    },
  });

const Story = mongoose.model("story", storySchema);

export { Story };
