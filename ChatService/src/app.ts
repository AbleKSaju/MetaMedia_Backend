import http from 'http'
import serverConfig from './server'
import dotenv from 'dotenv'
import config from '../config/config'
import getDb from '../config/db'
import express from 'express'
import cors from 'cors'
import { Server as SocketIOServer } from 'socket.io';

import {routes} from './adapters/routes'
import dependencies from './frameworks/config/dependencies'
import session, { SessionOptions,MemoryStore,SessionData } from "express-session";
const cookieParser = require('cookie-parser');
const store = new MemoryStore();
const app=express()
dotenv.config()
getDb(config)
const server=http.createServer(app)
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

 app.use(
    cors({
      origin:"http://localhost:5173",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );

  // const io = new SocketIOServer(server, {
  //   cors: {
  //     origin: 'http://localhost:5173'
  //   }
  // });
  
  // io.on('connection', (socket) => {
  //   console.log('client connected: ', socket.id);
  
    
  //   socket.on('joinRoom', (roomName:string) => {
  //     socket.join(roomName);
  //     console.log(`Client ${socket.id} joined room: ${roomName}`);
  //   });
  //   socket.on('personal', (id:string) => {
  //     socket.join(id);
  //     console.log(`Client ${socket.id} joined room: ${id}`);
  //   });
  
  //   socket.on('sentMsg', (data:any) => {
  //     console.log(data,'sentmgsss')
  //     // Here you can emit the message to all clients in the room or perform any other logic
  //     io.to(data.roomName).emit('message', { sender: socket.id, message: data.message });
  //   });
  //   socket.on('createRoom', (roomName:string) => {
  //     console.log(roomName,'create')
  //     socket.join(roomName);
  //   });
  
  //   socket.on('disconnect', (reason:any) => {
  //     console.log(reason);
  //   });
  // });
  
  // setInterval(() => {
  //   io.to('clock-room').emit('time', new Date());
  // }, 1000);

  // app.use(
  //   session({
  //     secret: "1234666",
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: {
  //       maxAge: 30 * 60 * 60 * 1000,
  //       httpOnly: true,
  //     },
  //     store: store,
  //   } as SessionOptions)
  // );


 app.use('/api',routes(dependencies))

serverConfig(server,config).startServer()