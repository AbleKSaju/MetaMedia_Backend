
export const addProfile_Usecase = (dependencies:any)=>{
    const {repository:{profileRepository}}=dependencies
    const  executeFunction=async(data:any)=>{
        // const {username,mobile,dob,location,bio}=data
        console.log(data,"data");
        const email="ableksaju3@gmail.com"
        
        const response=await profileRepository.addProfile(data,email)
        console.log(response,"RESSS from useCase");
        

    }
    return {executeFunction}
} 