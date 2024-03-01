import http from 'http'
import serverConfig from './server'
import dotenv from 'dotenv'
import config from '../config/config'
import getDb from '../config/db'
import express from 'express'
import cors from 'cors'
import {routes} from './adapters/routes'
import dependencies from './frameworks/config/dependencies'
import { Server, Socket } from 'socket.io';
import cookieParser from 'cookie-parser';
const app=express()
dotenv.config()
getDb(config)
app.use(
   cors({
     origin: 'http://localhost:5173',
     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
     credentials: true,
   })
 );

 const io: Server = require('socket.io')(8080, {
  cors: { origin: 'http://localhost:5173' }
});
const server=http.createServer(app)

 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 app.use(cookieParser(process.env.COOKIEPARSERSECRET));
 app.use(express.static('public/'))

 let users:any = [];

 io.on('connection', (socket: Socket) => {
  socket.on('addUser', userId => {
    const isUserExist = users.find((user:any) => user.userId === userId);
    if (!isUserExist) {
        const user = { userId, socketId: socket.id };
        users.push(user);
        io.emit('getUsers', users);
    }});  
  })


 app.use('/api',routes(dependencies))

serverConfig(server,config).startServer()