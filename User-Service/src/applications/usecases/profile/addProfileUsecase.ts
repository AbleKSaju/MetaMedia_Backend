
export const addProfileUsecase = (dependencies:any)=>{
    const {repository:{profileRepository}}=dependencies
    const  executeFunction=async(data:any,id:string)=>{
console.log(data);
console.log(id,"id");

        const response=await profileRepository.addProfile(data,id)
        console.log(response,"ADDPROFILE RES");
        
        if (response) {
            return { status: response.status, message: response.message ,user:response.user};
        }else{
              return { status: false, message: "Response not found" };
          }
    }
    return {executeFunction}
}