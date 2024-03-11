import common from '../common'
export default {
    save: async(data:any)=>{
  
 try {
    const {postId,userId}=data
    const postData=await common.findPostById(postId)
    if(postData){
     
    
       if(!postData.saved.includes(userId)){

           postData.saved.push(userId)

       }else{
           const index = postData.saved.indexOf(userId);
           if (index !== -1) {
            postData.saved.splice(index, 1);
           }
       }

      


const responce=await postData.save()

if(responce){
   return {status:true,data:responce}
}else{
   return {status:false,message:"no responce found"}
}

     

    }
    
 } catch (error) {
    return {status:false,message:error}
 }
    }
  }