import { Post } from "../database";

export default {
  addComment: async (data: any) => {
    try {
      const { userId, postId, content } = data;
      const postData = await Post.findById(postId);
      const obj = {
        userId: userId,
        content: content,
        replay: [],
      };
      postData?.comments.push(obj);
      const response = await postData?.save();
      if (response) {
        return { status: true, data: response };
      } else {
        return { status: false, message: "No posts found for the user" };
      }
    } catch (error) {
      console.error("Error from the getAllPostOfUser repository:", error);
      return {
        status: false,
        message: "An error occurred while fetching user posts",
      };
    }
  },
};
