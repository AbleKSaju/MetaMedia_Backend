
let users:any = [];
import {io} from './app'
import { Server, Socket } from 'socket.io';
const socketConfig=()=>{

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
 
   socket.on('sendMessage', async ({ senderId, receiverId, message, conversationId, lastUpdate, socketType }) => {
     const receiver = users.find((user:any) => user.userId === receiverId);
     const sender = users.find((user:any) => user.userId === senderId);
     console.log('sender :>> ', sender);
     console.log('receiver :>> ', receiver);
     if (receiver) {
       io.to(receiver?.socketId).to(sender.socketId).emit('getMessage', {senderId,message,conversationId,receiverId,socketType,lastUpdate});
     } else {
       io.to(sender?.socketId)?.emit('getMessage', {senderId,message,conversationId,receiverId,socketType,lastUpdate});
     }
   });
 
   socket.on('disconnect', () => {
     users = users.filter((user:any) => user.socketId !== socket.id);
     io.emit('getUsers', users);
   });
 
   socket.on('room:join', (data) => {
     const { name, room, receiverId, senderId } = data;
     const receiver = users.find((user:any) => user.userId === receiverId);
     io.to(receiver?.socketId).emit('callingToRoom',senderId,receiverId,room,name)
     emailToSocketIdMap.set(name, socket.id);
     socketidToEmailMap.set(socket.id, name);
     io.to(room).emit("user:joined", { name, id: socket.id });
     socket.join(room);
     io.to(socket.id).emit("room:join", data);
   })
   socket.on('room:audio:join', (data) => {
     const { name, room, receiverId, senderId } = data;
     console.log(name, room, receiverId, senderId,"name, room, receiverId, senderId");
     const receiver = users.find((user:any) => user.userId === receiverId);
     io.to(receiver?.socketId).emit('callingToAudioRoom', senderId, receiverId, room, name);
     emailToSocketIdMap.set(name, socket.id);
     socketidToEmailMap.set(socket.id, name);
     io.to(room).emit("user:Audiojoined", { name, id: socket.id });
     socket.join(room);
     io.to(socket.id).emit("room:audio:join", data);
   });
 
   socket.on("user:call", ({ to, offer }) => {
     io.to(to).emit("incomming:call", { from: socket.id, offer });
   });
 
   socket.on("call:accepted", ({ to, ans }) => {
     io.to(to).emit("call:accepted", { from: socket.id, ans });
   });
   socket.on("peer:nego:needed", ({ to, offer }) => {
     io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
   });
 
   socket.on("peer:nego:done", ({ to, ans }) => {
     io.to(to).emit("peer:nego:final", { from: socket.id, ans });
   });
 });
 
}


export default socketConfig