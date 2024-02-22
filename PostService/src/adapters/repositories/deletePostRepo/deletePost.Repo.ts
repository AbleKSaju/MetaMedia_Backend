import { Post } from "../database";

export default {
  delete: async (data: any) => {
    try {
        const {postId}=data
      const postData = await Post.findById(postId);
if(postData){
    postData.isDelete=true
    const response=await postData?.save()
    
    if (response) {
        return { status: true, data: response };
    } else {
        return { status: false, message: "No posts found for the user" };
    }
}else{
    return {status:false,message:"NO Post data Found"}
}
    } catch (error) {
      console.error('Error from the getAllPostOfUser repository:', error);
      return { status: false, message: "An error occurred while fetching user posts" };
    }
  }
};