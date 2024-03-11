export const updateComment_useCase=(dependencies:any)=>{

    const {  repositery: { updateComment }} = dependencies;
    const executeFunction=async(data:any)=>{
       const responce=await updateComment.update(data)
       if(responce.status){
        return {status:true,data:responce.data}
       }else{
        return {status:false,message:responce.message}
       }
    }
    return {executeFunction} 

}