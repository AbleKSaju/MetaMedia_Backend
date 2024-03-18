import { Post } from "../database";

export default {
  getallpostofuser: async (userId: any) => {
    try {
      const response = await Post.find({ userId: userId, isDelete: { $ne: true } }).sort({ createdAt: -1 })

      if (response && response.length > 0) {
        return { status: true, data: response };
      } else {
        return { status: false, message: "No posts found for the user" };
      }
    } catch (error) {
      console.error('Error from the getAllPostOfUser repository:', error);
      return { status: false, message: "An error occurred while fetching user posts" };
    }
  }
};
