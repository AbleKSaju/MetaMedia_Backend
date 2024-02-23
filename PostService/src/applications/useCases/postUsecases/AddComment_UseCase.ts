export const addComment_UseCase=(dependencies:any)=>{
    const {  repositery: { addComment  }} = dependencies;
    const executeFunction=async(data:any)=>{ 
        const responce =await addComment.addComment(data)
        if(responce.status){
            return {status:true,data:responce.data}
        }else{
            return {status:false}
        } 
    }
    return {executeFunction} 
}
