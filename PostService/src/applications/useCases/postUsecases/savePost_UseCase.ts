
export const savePost_UseCase=(dependencies:any)=>{

    
    const {savePostRepo}=dependencies.repositery
    const executeFunction=async(data:any)=>{


        const responce=await savePostRepo.save(data)
        if(responce.status){
            return {status:true,data:responce.data}
        }else{
            return {status:false,message:responce.message}
        }


    }

    return {executeFunction}

}