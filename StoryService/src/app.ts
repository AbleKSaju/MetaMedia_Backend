import http from 'http'
import serverConfig from './server'
import dotenv from 'dotenv'
import config from '../config/config'
import getDb from '../config/db'
import express ,{Request,Response}from 'express'
const cookieParser = require('cookie-parser');
import cors from 'cors'
import {routes} from './adapters/routes'
import dependencies from './frameworks/config/dependencies'
import session, { SessionOptions,MemoryStore,SessionData } from "express-session";
const store = new MemoryStore();
const app=express()
dotenv.config()
getDb(config)
const server=http.createServer(app)
//  authconsumer()
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

//  const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];
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
// })

 app.use('/api',routes(dependencies))

serverConfig(server,config).startServer()