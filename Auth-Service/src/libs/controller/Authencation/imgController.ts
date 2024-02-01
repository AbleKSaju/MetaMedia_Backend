import {Request,Response} from 'express'
import jwt from 'jsonwebtoken'

export default (dependecies:any)=>{
    const secret:any=process.env.REFRESH_SECRET_KEY
   const imgController=async(req:Request,res:Response)=>{
        const token=req.session.refreshToken
        let decoded:any
        jwt.verify(token,secret,(err:any,decode:any)=>{

            if(err) {
                return res.send(err)

            }else{
               decoded=decode
               const imageUlr=decoded.user.profile.profileUrl

               res.json({user:decoded.user,image:imageUlr})
            }

        })
   }
   return imgController
}