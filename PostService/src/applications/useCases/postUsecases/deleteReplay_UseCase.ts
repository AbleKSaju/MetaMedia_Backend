export const deleteReplay_UseCase=(dependencies:any)=>{

    const {  repositery: { deleteReplayRepo  }} = dependencies;
    const executeFunction=async(data:any)=>{
        if(!data){
            return {status:false,message:"no data found in useCse"}
        }
const responce=await deleteReplayRepo.deleteReplay(data)
if(responce.status){
    return {status:true,data:responce.data}
}else{
    return {status:false,message:responce.message}
}      

    }
    return {executeFunction} 

}