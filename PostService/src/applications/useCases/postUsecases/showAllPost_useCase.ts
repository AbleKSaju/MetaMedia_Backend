export const showAllPost_useCase=(dependencies:any)=>{

    const {  repositery: { showAllPostRepo }} = dependencies;
    const executeFunction=async()=>{
       const responce=await showAllPostRepo.showAllPost()
    
       
       if(responce.status){
        return {status:true,data:responce.data}
       }else{
        return {status:false}
       }
    }
    return {executeFunction} 

}