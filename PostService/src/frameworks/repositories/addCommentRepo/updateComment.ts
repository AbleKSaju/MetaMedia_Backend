
import common from "../common";
export default {
  update: async (data: any) => {
    try {
 const {postId,commentId,comment}=data

 if (!postId || !commentId || !comment) {
    return {status:false,message:"missing credentials"}
}
const postData= await common.findPostById(postId)

if(postData){
    const comments=postData.comments
    const findIndex=comments.findIndex((item:any)=>item._id==commentId)
    if (findIndex !== -1) {
      
        comments[findIndex].content = comment;

       
        const updatedPost = await postData.save();

       
        return { status: true, data: updatedPost };
    } else {
        return {status:false,message:"Comment not found"}
    }
 
}else{
    return {status:false,message:"post is not founded"}
}
     
    } catch (error) {
      console.error("Error from the updateComment repository:", error);
      return {
        status: false,
        message: "An error occurred while update Comment posts",
      };
    }
  },

  


};