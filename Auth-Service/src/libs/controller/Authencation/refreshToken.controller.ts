import {Request,Response} from 'express'
export default (dependencies:any)=>{
    const { useCase: { refreshTokenUsecase }} = dependencies;
const refreshToken=async(req:Request,res:Response)=>{
console.log("I AM refreshToken");
    const reference=await refreshTokenUsecase(dependencies)
    const {executeFunction}=reference
    const token = req.session.refreshToken
         if(!token)return  res.status(403).json('token is not found')
         const NewAccessToken=await executeFunction(token)
         console.log(NewAccessToken,"NewAccessTokenNewAccessToken");
         if(!NewAccessToken.status) return res.status(203).json(NewAccessToken.message)
         res.status(200).json({status:true,token:NewAccessToken.accessToken})
}

return refreshToken

}