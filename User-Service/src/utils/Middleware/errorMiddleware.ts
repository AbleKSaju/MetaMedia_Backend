import {Request,Response,NextFunction} from 'express'

    const errorMiddleware=(err: any,req: Request,res: Response,next: NextFunction)=>{
        console.log("I AM errorMiddleware");
        console.log(res.statusCode,"res.statusCode");
        
        let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
        let errMessage = err.message;
        if(err.name === 'castError' && err?.kind === 'ObjectId'){
            statusCode = 404;
            errMessage = 'Resource not found';
        }
        res.status(statusCode).json({
            errMessage,
            // stack : process.env.NODE_ENV === 'production' ? null : err.stack
        });
    }

export default errorMiddleware;