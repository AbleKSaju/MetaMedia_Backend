import {verifyHashPassword} from '../../../helper'


export const loginUser_usecases=(dependencies:any)=>
{
    const {
        repository: { authenticationRepository },
      } = dependencies;
    const executeFunction=async(email:string,password:string)=>{
        //find the user
        const responce=await authenticationRepository.finduser(email)
        console.log(responce);
        //user email and password is valid
        if(!responce.status){
            return ({message:"Email is not valid",status:false})
        }else{
            const {finduser}=responce
            const validUser=await verifyHashPassword(password,finduser.basicInformation.password)
            if(validUser){
                //create acces and refresh token 
                //responce the acess token refresh token and userdata without passoword

                return ({status:true,finduser})
            }else{
                return ({message:"password is not matching",status:false})
            }
        }
    }
    return {executeFunction}
}