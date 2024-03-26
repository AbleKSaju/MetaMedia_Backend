import { Post } from "../database";

export default {
  showAllPost: async () => {
    try {
      const response = await Post.find({ isDelete: { $ne: true } }).sort({ createdAt: -1 })
        console.log(response,"I AM ALL POSTSSS");
      if (response) {
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
