
let users:any = [];
import {io} from './app'
import { Server, Socket } from 'socket.io';
const socketConfig=()=>{

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

        socket.on('joinGroup', ({ group_id }) => {
          socket.join(group_id); 
          console.log(`User ${socket.id} joined group: ${group_id}`);
          });
      
        socket.on('sendMessage', async ({ senderId, receiverId, message, conversationId, lastUpdate }) => {
          console.log("Enter to sendMessage");
          console.log(lastUpdate,"lastUpdatelastUpdatelastUpdate");
      
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
      });


}


export default socketConfig