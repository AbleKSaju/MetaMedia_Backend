import { Post } from "../database";

export default {
  addLike: async (data:any) => {
    try {

        const {userId,postId}=data



      const postData = await Post.findById(postId);

      

      if (postData) {
      const isuserLikedAlredy=  postData.likes.includes(userId)
if(isuserLikedAlredy){
    postData.likes = postData.likes.filter(item => item !== userId);
    
}else{
    postData.likes.push(userId)

}
const responce =await postData.save()

     if(responce){
        return {status:true,data:responce}
     }else{
        return {status:false}
     }       

      } else {
        return { status: false, message: "No posts found for the user" };
      }
    } catch (error) {
      console.error('Error from the getAllPostOfUser repository:', error);
      return { status: false, message: "An error occurred while fetching user posts" };
    }
  }
};
