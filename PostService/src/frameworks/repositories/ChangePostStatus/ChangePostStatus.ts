import { Post } from "../database";

export default {
     ChangePostStatus: async (postId: any) => {
    try {
      const postData = await Post.findById(postId);
if(postData){
    console.log(postData,"postDatapostData");
    
    const newBlockedValue = !postData.blocked ?? true;
    console.log(newBlockedValue,"newBlockedValuenewBlockedValuenewBlockedValue");
    const response: any = await Post.findOneAndUpdate(
        { _id: postId },
        { $set: { blocked: newBlockedValue } },
        { new: true }
      );      
    
    if (response) {
        return { status: true, data: response, message:"post status changed" };
    } else {
        return { status: false, message: "Post status Error" };
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