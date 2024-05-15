import {verifyHashPassword} from '../../../helper'
import { createAccessToken, createRefreshToken } from '../../../utils/jwt';


export const loginUser_usecases=(dependencies:any)=>
{
    
    const {
        repository: { authenticationRepository },
      } = dependencies;
    const executeFunction=async(email:string,password:string)=>{
        //find the user
        const response=await authenticationRepository.finduser(email)
        //user email and password is valid
        
        if(!response.status){
            return ({message:"Email is not valid",status:false})
        }else{
            if(response.user.basicInformation.blocked){                
                return ({message:"You are Blocked by admin",status:false})
            }
            const {user}=response
            const validUser=await verifyHashPassword(password,user.basicInformation.password)
            if(validUser){
                //create acces and refresh token 
                const accesstoken=createAccessToken(user,process.env.ACCESS_SECRET_KEY!,process.env.ACCESS_EXPIRY!)
                const refreshtoken=createRefreshToken(user,process.env.REFRESH_SECRET_KEY!,process.env.REFRESH_EXPIRY!)
                console.log(response.user.basicInformation,"response.user.basicInformationresponse.user.basicInformation");
                
                if(response.user.basicInformation?.isAdmin){                
                    return ({status:true,message:"Login success",admin:true,user:user,accesstoken:accesstoken, refreshtoken:refreshtoken})
                }else{
                    return { status:true , accesstoken:accesstoken, refreshtoken:refreshtoken,user:user,message:"Login success",admin:false }
                }
            }else{
                return ({message:"password is not matching",status:false})
            }
        }
    }
    return {executeFunction}
}