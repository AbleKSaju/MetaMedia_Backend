import jwt from 'jsonwebtoken'
import { createAccessToken } from '../../../utils/jwt';
export const refreshTokenUsecase=async(dependencies:any)=>{
    const { repository: { authenticationRepository }} = dependencies;
    const refreshSecret:any=process.env.REFRESH_SECRET_KEY
    if(!authenticationRepository)return {status:false,message:"repositery not found"}
     
   const  executeFunction= async(token:string)=>{

    let playload:any

    jwt.verify(token,refreshSecret,(err:any,decode:any)=>{
        if(err){
            console.log(err,'Error');
            return {status:false,message:"error in jwt sign"}
        }else{
            playload=decode
        }
    })

    if(!playload.user)return {status:false,message:"play load is not found"}

    const user=await authenticationRepository.getuserbyId(playload.user._id)

    if(!user) return {status:false,message:"user is not "}

    const accessToken= createAccessToken(user,process.env.ACCESS_SECRET_KEY!,process.env.ACCESS_EXPIRY!)

    return {status:true,accessToken}

   }

  return {executeFunction}
}