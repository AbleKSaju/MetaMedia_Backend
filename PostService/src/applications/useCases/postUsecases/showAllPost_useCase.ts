export const showAllPost_useCase=(dependencies:any)=>{

    const {  repositery: { showAllPostRepo }} = dependencies;
    const executeFunction=async()=>{
       const response=await showAllPostRepo.showAllPost()      
       if(response.status){
        return {status:true,data:response.data,total:response.total}
       }else{
        return {status:false}
       }
    }
    return {executeFunction} 

}