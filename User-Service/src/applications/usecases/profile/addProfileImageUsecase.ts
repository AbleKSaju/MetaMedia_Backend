
export const AddProfileImageUsecase=(dependencies:any)=>{
    const {repository:{profileRepository}}=dependencies
    const executeFunction=async(profileImageUrl:any,userId:string)=>{
        console.log(profileImageUrl,userId,"details");
        const response = await profileRepository.addProfileImage(profileImageUrl,userId)
        if(response){
            return {status:response?.status,message:response?.message,data:response?.data}
        }else{
            return {status:false,message:"Add profilr error"}
        }
    }
    return {executeFunction}

}