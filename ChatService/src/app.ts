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
  console.log("USER CONNECTED",socket?.id);
  
  socket.on('addUser', userId => {
    const isUserExist = users.find((user:any) => user.userId === userId);
    if (!isUserExist) {
        const user = { userId, socketId: socket.id };
        console.log(user,"useruseruseruseruseruseruseruser");
        
        users.push(user);
        io.emit('getUsers', users);
    }
  });  

  socket.on('sendMessage', async ({ senderId, receiverId, message, conversationId }) => {
    console.log("Enter to sendMessage");
    console.log(users,"usersusersusersusersusersusers");
    console.log(senderId,"senderId");
    console.log(receiverId,"receiverId");
    
    const receiver = users.find((user:any) => user.userId === receiverId);
    const sender = users.find((user:any) => user.userId === senderId);
    console.log('sender :>> ', sender);
    console.log('receiver :>> ', receiver);

    if (receiver) {
      io.to(receiver.socketId).to(sender.socketId).emit('getMessage', {
          senderId,
          message,
          conversationId,
          receiverId,
      });
    } else {
      io.to(sender?.socketId)?.emit('getMessage', {
          senderId,
          message,
          conversationId,
          receiverId,
      });
    }
  });

  socket.on('disconnect', () => {
    users = users.filter((user:any) => user.socketId !== socket.id);
    io.emit('getUsers', users);
  });
});


  

 app.use('/api',routes(dependencies))

serverConfig(server,config).startServer()