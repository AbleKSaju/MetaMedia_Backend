import mongoose from "mongoose";
import { Post } from "../database";

export default {
    getLikedAndCommentedPost: async (userId: any) => {
    try {
        const SavedPosts = (await Post.find({ saved: userId })).reverse();
        const CommentedPosts = (await Post.find({'comments.userId': userId})).reverse();
        const likedPosts = (await Post.find({ likes: userId })).reverse();
        
        if (likedPosts.length || CommentedPosts || SavedPosts) {
            return { status: true, post: likedPosts, comment: CommentedPosts, saved: SavedPosts };
        } else {
            return { status: true, data: [] };
        }
    } catch (error) {
      console.error('Error from the getAllPostOfUser repository:', error);
      return { status: false, message: "An error occurred while fetching user posts" };
    }
  }
};
