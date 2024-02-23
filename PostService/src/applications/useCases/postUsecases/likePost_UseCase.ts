export const likePost_UseCase=(dependencies:any)=>{

    const {  repositery: {addLikerepo  }} = dependencies;
    // const responce=await showAllPostRepo.showAllPost()
    const executeFunction=async(data:any)=>{
        
        const responce=await addLikerepo.addLike(data)
        if(responce.status){
            return {status:true,data:responce.data}
        }else{
            return {status:false}
        }
        
    }
    return {executeFunction} 

}
