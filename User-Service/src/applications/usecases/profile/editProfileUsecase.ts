
export const editUserUsecase=(dependencies:any)=>{
    const {repository:{profileRepository}}=dependencies
    const executeFunction = async (data:any,userId:string)=>{
        console.log(data,"editUserUsecase");
        const response=await profileRepository.editUserProfile(data,userId)
        console.log(response,"Reees");
        if (response) {
            const {fullName,userName,userId,phoneNumber,gender}=response.user.basicInformation
            const {bio} = response.user.profile            
            const data={fullName,userName,userId,phoneNumber,gender,bio}
            console.log(data,"Ddddd");
            
            return { status: response.status, message: response.message , user:data };
        }else{
              return { status: false, message: "Response not found" };
          }
    }
    return {executeFunction}
}
