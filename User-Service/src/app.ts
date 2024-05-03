import http from 'http'
import serverConfig from './server'
import dotenv from 'dotenv'
import config from '../Config/config'
import getDb from '../Config/db'
import express ,{Request,Response}from 'express'
const cookieParser = require('cookie-parser');
import cors from 'cors'
import {userconsumer} from './Events/userconsumer'
import {routes} from './Adapters/Routes'
import dependencies from './Frameworks/config/dependencies'
import session, { SessionOptions,MemoryStore,SessionData } from "express-session";
import helmet from "helmet";
import { body } from 'express-validator'
import { sanitizeData } from './Utils/Sanitize/sanitizeData'
import errorMiddleware from './Utils/Middleware/errorMiddleware'

const store = new MemoryStore();
const app=express()
getDb(config)

const server=http.createServer(app)
dotenv.config()

// app.use(body().trim().escape());

// app.use(helmet({ xssFilter: true }));

// app.use((req, res, next) => {
//   const hasScript = sanitizeData(req.body) || sanitizeData(req.query) || sanitizeData(req.params);
//   if (hasScript) {
//     return res.status(400).send("Detected malicious script in request.");
//   }
//   next();
// });

declare module 'express-session' {
  interface Session {
    userData:{
      _id:string,
      name:string,
      email:string,
      password:string,
      isGoogle:boolean,
      isFacebook:boolean,
      profile:string
    } ;
    Otp:string,
    Token:string
  }
}


 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 app.use(cookieParser(process.env.COOKIEPARSERSECRET));
 app.use(express.static('public/'))


 const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];
 app.use(
    cors({
      origin:"http://localhost:5173",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );

  app.use(
    session({
      secret: "1234666",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 60 * 60 * 1000,
        httpOnly: true,
      },
      store: store,
    } as SessionOptions)
  );

// app.use("/api/v1/authsetting",(req: Request ,res:Response)=>{
//   console.log(req.body,"bodyssss");
//   req.session.Token = req.body.refreshToken
//   res.status(200).json({status:true})
// app.all('*', (req, res, next: any) => {
//     const err: any = new Error(`Can't find ${req.originalUrl} on the server!`);
//     err.status = 'fail';
//     err.statusCode = 404;
//     next(err);
// });

// app.use((error: any, req: Request, res: Response, next: any) => {
//     error.statusCode = error.statusCode || 500;
//     error.status = error.status || 'error';
//     res.status(error.statusCode).json({ status: error.statusCode, message: error.message });
// });
userconsumer(dependencies)

app.use('/api',routes(dependencies))
app.use(errorMiddleware)

serverConfig(server,config).startServer()