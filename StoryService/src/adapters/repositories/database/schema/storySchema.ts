import mongoose, { Types } from "mongoose";
import cron from "node-cron";

const storySchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  profile: {
    type: String,
  },
  content: {
    story: [
      {
        caption: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        storyUrl: {
          type: String,
          required: true,
        },
        status: {
          type: Boolean,
          default: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        expiresAt: {
          type: Date,
          default: () => Date.now() + 24 * 60 * 60 * 1000,
        },
      },
    ],
  },
});

// Middleware to update the status of expired stories
const updateExpiredStories = async () => {
  console.log("I AM updateExpiredStories");
  const now = new Date();
  const expiredStories = await Story.find({
    "content.story.expiresAt": { $lte: now },
    "content.story.status": true,
  });
  if (expiredStories.length > 0) {
    expiredStories.forEach(async (story) => {
      story?.content?.story?.forEach((item) => {
        if (item.expiresAt <= now) {
          item.status = false;
        }else{
          item.status = true;
        }
      });
      await story.save();
    });
  }
};
// Schedule the job to run every 5 minutes
cron.schedule("*/5 * * * *", updateExpiredStories);
const Story = mongoose.model("story", storySchema);

export { Story };