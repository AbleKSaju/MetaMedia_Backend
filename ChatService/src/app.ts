import http from 'http'
import serverConfig from './server'
import dotenv from 'dotenv'
import config from '../config/config'
import getDb from '../config/db'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import {routes} from './adapters/routes'
import dependencies from './frameworks/config/dependencies'
import { Server, Socket } from 'socket.io';
import cookieParser from 'cookie-parser';
import { debounceMiddleware } from './events/DebouncingMiddleware'
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

 const io: Server = require('socket.io')(8081, {
  cors: { origin: 'http://localhost:5173' }
});
const server=http.createServer(app)

 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 app.use(cookieParser(process.env.COOKIEPARSERSECRET));
 app.use(express.static('public/'))

 let users:any = [];

 const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

 io.on('connection', (socket: Socket) => {
  console.log("USER CONNECTED",socket?.id);
  
  socket.on('addUser', userId => {
    const isUserExist = users.find((user:any) => user.userId === userId);
    if (!isUserExist) {
        const user = { userId, socketId: socket.id };        
        users.push(user);
        io.emit('getUsers', users);
    }
  });  

  socket.on('sendMessage', async ({ senderId, receiverId, message, conversationId, lastUpdate }) => {
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
          lastUpdate
      });
    } else {
      io.to(sender?.socketId)?.emit('getMessage', {
          senderId,
          message,
          conversationId,
          receiverId,
          lastUpdate
      });
    }
  });

  socket.on('disconnect', () => {
    users = users.filter((user:any) => user.socketId !== socket.id);
    io.emit('getUsers', users);
  });

  socket.on('room:join', (data) => {
    const { name, room } = data;
    emailToSocketIdMap.set(name, socket.id);
    socketidToEmailMap.set(socket.id, name);
    io.to(room).emit("user:joined", { name, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  })

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });
  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});


  app.use(debounceMiddleware)
 app.use('/api',routes(dependencies))

serverConfig(server,config).startServer()