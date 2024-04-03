import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
    const authMiddlewawre=(req: Request,res: Response,next: NextFunction)=>{
        console.log("AUTH MIDDLEWARE")
        if(!req.headers.authorization){
            console.log("NO HEADER")
            res.status(401).json('Authorization header required');
        }else{
            try{
                const token = req.headers.authorization.split(' ')[1];
                console.log("TOKEN IN MIDDLEWARE ==>",token);
                const decode = jwt.verify(token, process.env.ACCESS_SECRET_KEY!)
                console.log("Token verified")
                next();
            }catch(err){
                console.log("Catch in authMiddleware ==>",err);
                res.status(401).json('Invalid access token');
            }
        }
    }

export default authMiddlewawre;