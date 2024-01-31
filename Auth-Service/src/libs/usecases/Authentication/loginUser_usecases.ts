import {verifyHashPassword} from '../../../helper'
import { createAccessToken, createRefreshToken } from '../../../utils/jwt';


export const loginUser_usecases=(dependencies:any)=>
{
    const {
        repository: { authenticationRepository },
      } = dependencies;
    const executeFunction=async(email:string,password:string)=>{
        //find the user
        const responce=await authenticationRepository.finduser(email)
        //user email and password is valid
        if(!responce.status){
            return ({message:"Email is not valid",status:false})
        }else{
            const {user}=responce
            const validUser=await verifyHashPassword(password,user.basicInformation.password)
            if(validUser){
                //create acces and refresh token 
                const accesstoken=createAccessToken(user,process.env.ACCESS_SECRET_KEY!,process.env.ACCESS_EXPIRY!)
                const refreshtoken=createRefreshToken(user,process.env.REFRESH_SECRET_KEY!,process.env.REFRESH_EXPIRY!)
                return { status:true , accesstoken:accesstoken, refreshtoken:refreshtoken,user:user,message:"user logined" }
            }else{
                return ({message:"password is not matching",status:false})
            }
        }
    }
    return {executeFunction}
}