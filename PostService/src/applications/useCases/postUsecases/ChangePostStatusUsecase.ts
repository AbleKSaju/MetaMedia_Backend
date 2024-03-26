export const ChangePostStatus_usecase=(dependencies:any)=>{

    const {  repositery: {ChangePostStatus  }} = dependencies;
    // const responce=await showAllPostRepo.showAllPost()
    const executeFunction=async(data:any)=>{
        
        const responce=await ChangePostStatus.ChangePostStatus(data)
        console.log(responce,'HHHH');
        
        if(responce.status){
            return {status:true,data:responce.data}
        }else{
            return {status:false}
        }
        
    }
    return {executeFunction} 

}
