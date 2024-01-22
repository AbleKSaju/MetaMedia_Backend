import {userProducer} from '../../../events/userproducer'

export const verifyOtp_Usecase = (dependencies: any) => {
    const {
        repository: { authenticationRepository },
      } = dependencies;
    const executeFunction=async(data:any)=>{
        const addUserData=await authenticationRepository.createUser(data)


        if(addUserData.status){


          const res=await  userProducer(addUserData.response,"auth",'add-user')
         
          if(res){

              return({status:true,addUserData})
          }else{
            return ({status:false})
          }
          
        }else{
            return ({status:false})
        }
    }
    return {
        executeFunction
    }

}