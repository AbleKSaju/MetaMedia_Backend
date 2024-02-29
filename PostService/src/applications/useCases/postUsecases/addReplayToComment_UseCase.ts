export const addReplayToComment_UseCase=(dependencies:any)=>{

    const {  repositery: { addReplayToCommentRepo }} = dependencies;
    const executeFunction=async(data:any)=>{


        const responce=await addReplayToCommentRepo.addReplayToComment(data)
        if(responce.status){
            return {status:true,data:responce.data}
        }else{
            return {status:false}
        }
        

    }
    return {executeFunction} 

}