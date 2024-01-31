import http from 'http'
import serverConfig from './server'
import getDb from './config/db'
import {routes} from './Router'
import config from './config/config'
import expresscofig from './express'
import express from 'express'
import dependencies from './config/dependencies'
import session, { SessionOptions,MemoryStore,SessionData } from "express-session";
import dotenv from 'dotenv'
import cors from 'cors'
const cookieParser = require('cookie-parser');
const app=express()
const server=http.createServer(app)
dotenv.config()
getDb(config)
const store = new MemoryStore();
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
    refreshToken:string
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIEPARSERSECRET));
app.use(
   cors({
     origin: "http://localhost:5173",
     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
     credentials: true,
   })
 );

app.use(
    session({
      secret: process.env.SESSION_SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 60 * 60 * 1000,
        httpOnly: true,
      },
      store: store,
    } as SessionOptions)
  );
  
expresscofig(app)

app.use('/api',routes(dependencies))
serverConfig(server,config).startServer()