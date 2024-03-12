import { Post } from "../database";

export default {
  addLike: async (data: any) => {
    try {
      const { userId, postId } = data;


      const postData = await Post.findById(postId);

      if (postData) {

console.log('1');

      const isuserLikedAlredy =  postData.likes.includes(userId)
console.log(isuserLikedAlredy);
      
if(isuserLikedAlredy){
console.log('2');

  const index = postData.likes.indexOf(userId);
  console.log(index,'INdex');
  
  if (index !== -1) {
      postData.likes.splice(index, 1);
  }

   
}else{
    postData.likes.push(userId)

    
  }
  const responce = await postData.save();

       if (responce) {
        return { status: true, data: responce };
      } else {
        return { status: false ,message:"no data"};
      }

      } else {
        return { status: false, message: "No posts found for the user" };
      }}
     catch (error) {
      console.error("Error from the getAllPostOfUser repository:", error);
      return {
        status: false,
        message: "An error occurred while fetching user posts",
      };
    }
  },
};
