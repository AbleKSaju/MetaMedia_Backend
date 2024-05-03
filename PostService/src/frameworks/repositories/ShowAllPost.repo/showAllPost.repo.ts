import { Post } from "../database";

export default {
  showAllPost: async () => {

    
    try {
      const total = await Post.countDocuments();
      // const skip = (page -1) * size;
      const response = await Post.find({ isDelete: { $ne: true } }).sort({ createdAt: -1 })
      if (response) {
        return { status: true, data: response, total};
      } else {
        return { status: false, message: "No posts found for the user" };
      }
    } catch (error) {
      console.error('Error from the getAllPostOfUser repository:', error);
      return { status: false, message: "An error occurred while fetching user posts" };
    }
  }
};
  