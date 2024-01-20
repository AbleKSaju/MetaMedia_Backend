

export const verifyOtp_Usecase = (dependencies: any) => {
    const {
        repository: { authenticationRepository },
      } = dependencies;
    const executeFunction=async(data:any)=>{
        const addUserData=await authenticationRepository.createUser(data)
        if(addUserData.status){
            return({status:true,addUserData})
        }else{
            return ({status:false})
        }
    }
    return {
        executeFunction
    }

}