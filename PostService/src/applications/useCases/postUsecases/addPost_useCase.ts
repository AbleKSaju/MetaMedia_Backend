export const addPostUseCase= (dependencies:any)=>{
    const {   createPostRepo } = dependencies.repositery;

    const executeFunction=async (data:any)=>{
        
        
        console.log('this is data',data);
        const responce= await createPostRepo.createPost(data)

        if(responce.status){
            return {status:true,responce:responce.data}
        }else{
            return {status:false,message:"post creattion faile"}
        }
        
    }
    return {executeFunction}
}

