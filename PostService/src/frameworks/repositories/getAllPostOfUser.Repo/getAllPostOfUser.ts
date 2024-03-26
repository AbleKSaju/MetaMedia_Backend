import { Post } from "../database";

export default {
  getallpostofuser: async (userId: any) => {
    try {
      const response = await Post.find({ userId: userId, isDelete: { $ne: true } }).sort({ createdAt: -1 })
      const TaggedPosts = await Post.find({ tags: userId });
      if (response && response.length > 0 || TaggedPosts) {
        return { status: true, data: response , tagged:TaggedPosts };
      } else {
        return { status: false, message: "No posts found for the user" };
      }
    } catch (error) {
      console.error('Error from the getAllPostOfUser repository:', error);
      return { status: false, message: "An error occurred while fetching user posts" };
    }
  }
};
