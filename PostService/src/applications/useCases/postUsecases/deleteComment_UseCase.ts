export const deleteComment_UseCase=(dependencies:any)=>{

    const {  repositery: { deleteCommentRepo }} = dependencies;
    const executeFunction=async(data:any)=>{
        if(!data){
            return {status:false,message:"no data found in useCse"}
        }
const responce= await deleteCommentRepo.deleteComment(data) 
if(responce.status){
    return {status:true,data:responce.data}
}else{
    return {status:false,message:responce.message}
}      

    }
    return {executeFunction} 

}