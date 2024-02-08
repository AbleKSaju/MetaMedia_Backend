export const sayHello_usecase=(dependencies:any)=>{

    const {  repositery: { sayHelloRepo }} = dependencies;
    const executeFunction=async()=>{
        const responceFromSayHelloRepo=await sayHelloRepo.postExist()
        return {message:responceFromSayHelloRepo.message}
    }
    return {executeFunction} 

}