import { Post } from "../database";
export default {
    report: async(data:any)=>{
  
  const {postId,content,userId}=data
     const postData=await Post.findById(postId)
     if(postData){
      
     
const report={
    userId:userId,
    content:content
}

postData.reports.push(report)

const responce=await postData.save()

if(responce){
    return {status:true,data:responce}
}else{
    return {status:false,message:"no responce found"}
}

      

     }
    }
  }