
export const reportPost_UseCase=(dependencies:any)=>{

    
    const {reportPostRepo}=dependencies.repositery
    const executeFunction=async(data:any)=>{


        const responce=await reportPostRepo.report(data)
        if(responce.status){
            return {status:true,data:responce.data}
        }else{
            return {status:false,message:responce.message}
        }


    }

    return {executeFunction}

}