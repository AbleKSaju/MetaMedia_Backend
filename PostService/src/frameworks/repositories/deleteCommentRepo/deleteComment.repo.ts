import { Post } from "../database";

export default {
  deleteComment: async (data:any) => {
    try {
        const {postId,commentId}=data


      const postData = await Post.findById(postId);

      if(postData){

        const commentIndex = postData.comments.findIndex((comment:any) => comment._id.equals(commentId));

       
        if (commentIndex === -1) {
            return { status: false, message: 'Comment not found' };
        }

       
        postData.comments.splice(commentIndex, 1);

       
       const responce= await postData.save();
       if(responce){
        return {status:true,data:responce}
       }else{
        return {status:false,message:"respoce not found"}
       }


      }else{
        return {status:false,message:"post Data not found"}
      }

  
    } catch (error) {
      console.error('Error from the comment delete:', error);
      return { status: false, message: "An error occurred while fetching delete commet" };
    }
  }
};
