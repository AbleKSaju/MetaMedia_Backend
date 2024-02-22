import { Post } from "../database";
export default {
    addReplayToComment: async(data:any)=>{
  
  const {postId,commentId,content,userId}=data
     const postData=await Post.findById(postId)
     if(postData){
      const comment:any=  postData.comments.find((comment:any) => comment._id.toString() === commentId);
      if(!comment){
        return {status:false}
      }
        const newReply = {
            userId: userId,
            content: content,
            createdAt: new Date() // Optionally set the createdAt field
        }
            comment.replay.push(newReply)


     


const responce=await postData.save()

if(responce){
    return {status:true,data:responce}
}else{
    return {status:false}
}

      

     }
    }
  }
  
  