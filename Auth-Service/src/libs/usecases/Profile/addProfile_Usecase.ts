
export const addProfile_Usecase = (dependencies:any)=>{
    const {repository:{profileRepository}}=dependencies
    const  executeFunction=async(data:any,id:string)=>{
        // const {username,mobile,dob,location,bio}=data
        console.log(data,"data");
        const response=await profileRepository.addProfile(data,id)
        if (response) {
            return { status: response.status, message: response.message };
        }else{
              return { status: false, message: "Response not found" };
          }
    }
    return {executeFunction}
}